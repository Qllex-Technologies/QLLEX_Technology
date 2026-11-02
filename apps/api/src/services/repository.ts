import fs from "fs";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import {
  EnquiryModel,
  QuoteRequestModel,
  BlogPostModel,
  PortfolioProjectModel,
  AdminUserModel,
  TestimonialModel,
  ServiceSeoOverrideModel,
} from "../models";
import { getDbMode } from "../config/db";
import { env } from "../config/env";
import { logger } from "../config/logger";
import { AppError } from "../middleware/error";
import { INITIAL_BLOG_POSTS, INITIAL_PORTFOLIO_PROJECTS } from "./seedData";
import {
  ContactEnquiryInput,
  QuoteRequestInput,
  BlogPostInput,
  PortfolioProjectInput,
  TestimonialInput,
  ServiceSeoOverrideInput,
  EnquiryStatusUpdateInput,
} from "@nexovanta/shared";

interface LocalStore {
  enquiries: Array<Record<string, any>>;
  quotes: Array<Record<string, any>>;
  blogs: Array<Record<string, any>>;
  portfolio: Array<Record<string, any>>;
  admins: Array<Record<string, any>>;
  testimonials: Array<Record<string, any>>;
  serviceSeoOverrides: Array<Record<string, any>>;
}

const DATA_DIR = path.resolve(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "local-db.json");

function loadLocalStore(): LocalStore {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      return JSON.parse(raw) as LocalStore;
    }
  } catch (err) {
    logger.warn("Could not read local fallback store; initializing fresh store", {
      error: err instanceof Error ? err.message : String(err),
    });
  }
  return {
    enquiries: [],
    quotes: [],
    blogs: [],
    portfolio: [],
    admins: [],
    testimonials: [],
    serviceSeoOverrides: [],
  };
}

function saveLocalStore(store: LocalStore) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
}

let memoryStore: LocalStore = loadLocalStore();

function assertDatabaseAvailable(simulateFailure?: boolean) {
  if (simulateFailure || getDbMode() === "disconnected") {
    throw new AppError(
      503,
      "Database service is temporarily unavailable. Your submission was not saved—please retry in a moment."
    );
  }
}

export async function seedInitialData() {
  const mode = getDbMode();
  if (mode === "disconnected") return;

  const passwordHash = await bcrypt.hash(env.ADMIN_BOOTSTRAP_PASSWORD, 10);

  if (mode === "mongodb") {
    const bootstrapEmail = env.ADMIN_BOOTSTRAP_EMAIL.toLowerCase();
    const existingBootstrap = await AdminUserModel.findOne({ email: bootstrapEmail });
    if (!existingBootstrap) {
      await AdminUserModel.create({
        email: bootstrapEmail,
        passwordHash,
        role: "superadmin",
      });
      logger.info("Bootstrapped default admin user in MongoDB", {
        email: env.ADMIN_BOOTSTRAP_EMAIL,
      });
    }

    const blogCount = await BlogPostModel.countDocuments();
    if (blogCount === 0) {
      await BlogPostModel.insertMany(INITIAL_BLOG_POSTS);
      logger.info("Seeded initial blog articles in MongoDB", {
        count: INITIAL_BLOG_POSTS.length,
      });
    }

    const portfolioCount = await PortfolioProjectModel.countDocuments();
    if (portfolioCount === 0) {
      await PortfolioProjectModel.insertMany(INITIAL_PORTFOLIO_PROJECTS);
      logger.info("Seeded initial reference portfolio projects in MongoDB", {
        count: INITIAL_PORTFOLIO_PROJECTS.length,
      });
    }
    return;
  }

  // Local persistence fallback seeding
  let mutated = false;
  const localBootstrapEmail = env.ADMIN_BOOTSTRAP_EMAIL.toLowerCase();
  if (!memoryStore.admins.some((a) => a.email === localBootstrapEmail)) {
    memoryStore.admins.push({
      _id: crypto.randomUUID(),
      email: localBootstrapEmail,
      passwordHash,
      role: "superadmin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    mutated = true;
  }

  if (memoryStore.blogs.length === 0) {
    memoryStore.blogs = INITIAL_BLOG_POSTS.map((post) => ({
      _id: crypto.randomUUID(),
      ...post,
      createdAt: post.publishedAt,
      updatedAt: post.publishedAt,
    }));
    mutated = true;
  }

  if (memoryStore.portfolio.length === 0) {
    memoryStore.portfolio = INITIAL_PORTFOLIO_PROJECTS.map((proj) => ({
      _id: crypto.randomUUID(),
      ...proj,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    mutated = true;
  }

  if (mutated) {
    saveLocalStore(memoryStore);
    logger.info("Initialized local persistence fallback store with seed data");
  }
}

export const repository = {
  // --- CONTACT ENQUIRIES ---
  async createEnquiry(
    input: ContactEnquiryInput,
    options?: { simulateDbFailure?: boolean }
  ) {
    assertDatabaseAvailable(options?.simulateDbFailure);

    // Validate through Mongoose model instance
    const doc = new EnquiryModel({
      fullName: input.fullName,
      email: input.email.toLowerCase(),
      phone: input.phone || "",
      companyName: input.companyName || "",
      serviceRequired: input.serviceRequired,
      projectDescription: input.projectDescription,
      preferredContactMethod: input.preferredContactMethod || "email",
      status: "New",
    });
    const validationError = doc.validateSync();
    if (validationError) {
      throw new AppError(400, validationError.message);
    }

    const ninetySecondsAgo = Date.now() - 90 * 1000;

    if (getDbMode() === "mongodb") {
      const duplicate = await EnquiryModel.findOne({
        email: input.email.toLowerCase(),
        serviceRequired: input.serviceRequired,
        createdAt: { $gte: new Date(ninetySecondsAgo) },
      }).lean();

      if (duplicate) {
        throw new AppError(
          409,
          "We already received this enquiry moments ago. Our team will respond shortly."
        );
      }

      const saved = await doc.save();
      return saved.toObject();
    }

    const duplicate = memoryStore.enquiries.find(
      (e) =>
        e.email === input.email.toLowerCase() &&
        e.serviceRequired === input.serviceRequired &&
        new Date(e.createdAt).getTime() >= ninetySecondsAgo
    );
    if (duplicate) {
      throw new AppError(
        409,
        "We already received this enquiry moments ago. Our team will respond shortly."
      );
    }

    const record = {
      _id: doc._id.toString(),
      fullName: doc.fullName,
      email: doc.email,
      phone: doc.phone || "",
      companyName: doc.companyName || "",
      serviceRequired: doc.serviceRequired,
      budget: doc.budget || "",
      projectDescription: doc.projectDescription,
      preferredContactMethod: doc.preferredContactMethod || "email",
      status: doc.status,
      internalNotes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryStore.enquiries.unshift(record);
    saveLocalStore(memoryStore);
    return record;
  },

  async listEnquiries(simulateDbFailure?: boolean) {
    assertDatabaseAvailable(simulateFailureFlag(simulateDbFailure));
    if (getDbMode() === "mongodb") {
      return EnquiryModel.find().sort({ createdAt: -1 }).lean();
    }
    return memoryStore.enquiries;
  },

  async updateEnquiryStatus(id: string, update: EnquiryStatusUpdateInput) {
    assertDatabaseAvailable();
    if (getDbMode() === "mongodb") {
      const updated = await EnquiryModel.findByIdAndUpdate(
        id,
        {
          $set: {
            status: update.status,
            ...(update.internalNotes !== undefined
              ? { internalNotes: update.internalNotes }
              : {}),
          },
        },
        { new: true }
      ).lean();
      if (!updated) throw new AppError(404, "Enquiry not found.");
      return updated;
    }

    const item = memoryStore.enquiries.find((e) => String(e._id) === id);
    if (!item) throw new AppError(404, "Enquiry not found.");
    item.status = update.status;
    if (update.internalNotes !== undefined) {
      item.internalNotes = update.internalNotes;
    }
    item.updatedAt = new Date().toISOString();
    saveLocalStore(memoryStore);
    return item;
  },

  async getEnquiryById(id: string) {
    assertDatabaseAvailable();
    if (getDbMode() === "mongodb") {
      const enquiry = await EnquiryModel.findById(id).lean();
      if (!enquiry) throw new AppError(404, "Enquiry not found.");
      return enquiry;
    }
    const enquiry = memoryStore.enquiries.find((e) => String(e._id) === id);
    if (!enquiry) throw new AppError(404, "Enquiry not found.");
    return enquiry;
  },

  async deleteEnquiry(id: string) {
    assertDatabaseAvailable();
    if (getDbMode() === "mongodb") {
      const deleted = await EnquiryModel.findByIdAndDelete(id).lean();
      if (!deleted) throw new AppError(404, "Enquiry not found.");
      return deleted;
    }
    const idx = memoryStore.enquiries.findIndex((e) => String(e._id) === id);
    if (idx === -1) throw new AppError(404, "Enquiry not found.");
    const [deleted] = memoryStore.enquiries.splice(idx, 1);
    saveLocalStore(memoryStore);
    return deleted;
  },

  async updateEnquiryNotification(
    id: string,
    updates: {
      emailStatus?: string;
      emailError?: string;
      whatsappStatus?: string;
      whatsappError?: string;
    }
  ) {
    const $set: Record<string, any> = {};
    if (updates.emailStatus !== undefined) {
      $set.emailNotificationStatus = updates.emailStatus;
      if (updates.emailStatus === "sent") $set.emailSentAt = new Date();
    }
    if (updates.emailError !== undefined) $set.emailNotificationError = updates.emailError;
    if (updates.whatsappStatus !== undefined) {
      $set.whatsappNotificationStatus = updates.whatsappStatus;
      if (updates.whatsappStatus === "sent") $set.whatsappSentAt = new Date();
    }
    if (updates.whatsappError !== undefined) $set.whatsappNotificationError = updates.whatsappError;

    if (getDbMode() === "mongodb") {
      return EnquiryModel.findByIdAndUpdate(id, { $set }, { new: true }).lean();
    }
    const item = memoryStore.enquiries.find((e) => String(e._id) === id);
    if (item) {
      Object.assign(item, $set, { updatedAt: new Date().toISOString() });
      saveLocalStore(memoryStore);
    }
    return item;
  },

  // --- QUOTE REQUESTS ---
  async createQuoteRequest(
    input: QuoteRequestInput,
    options?: { simulateDbFailure?: boolean }
  ) {
    assertDatabaseAvailable(options?.simulateDbFailure);

    const doc = new QuoteRequestModel({
      name: input.name,
      email: input.email.toLowerCase(),
      phone: input.phone,
      companyName: input.companyName || "",
      projectCategory: input.projectCategory,
      budgetRange: "",
      desiredTimeline: input.desiredTimeline,
      requiredFeatures: input.requiredFeatures,
      projectDetails: input.projectDetails,
      status: "new",
    });
    const validationError = doc.validateSync();
    if (validationError) {
      throw new AppError(400, validationError.message);
    }

    const ninetySecondsAgo = Date.now() - 90 * 1000;

    if (getDbMode() === "mongodb") {
      const duplicate = await QuoteRequestModel.findOne({
        email: input.email.toLowerCase(),
        projectCategory: input.projectCategory,
        createdAt: { $gte: new Date(ninetySecondsAgo) },
      }).lean();

      if (duplicate) {
        throw new AppError(
          409,
          "We already received your quote request moments ago. Our engineering team is reviewing it."
        );
      }

      const saved = await doc.save();
      return saved.toObject();
    }

    const duplicate = memoryStore.quotes.find(
      (q) =>
        q.email === input.email.toLowerCase() &&
        q.projectCategory === input.projectCategory &&
        new Date(q.createdAt).getTime() >= ninetySecondsAgo
    );
    if (duplicate) {
      throw new AppError(
        409,
        "We already received your quote request moments ago. Our engineering team is reviewing it."
      );
    }

    const record = {
      _id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      companyName: doc.companyName,
      projectCategory: doc.projectCategory,
      budgetRange: doc.budgetRange,
      desiredTimeline: doc.desiredTimeline,
      requiredFeatures: doc.requiredFeatures,
      projectDetails: doc.projectDetails,
      status: doc.status,
      internalNotes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryStore.quotes.unshift(record);
    saveLocalStore(memoryStore);
    return record;
  },

  async listQuoteRequests() {
    assertDatabaseAvailable();
    if (getDbMode() === "mongodb") {
      return QuoteRequestModel.find().sort({ createdAt: -1 }).lean();
    }
    return memoryStore.quotes;
  },

  async updateQuoteStatus(id: string, update: EnquiryStatusUpdateInput) {
    assertDatabaseAvailable();
    if (getDbMode() === "mongodb") {
      const updated = await QuoteRequestModel.findByIdAndUpdate(
        id,
        {
          $set: {
            status: update.status,
            ...(update.internalNotes !== undefined
              ? { internalNotes: update.internalNotes }
              : {}),
          },
        },
        { new: true }
      ).lean();
      if (!updated) throw new AppError(404, "Quote request not found.");
      return updated;
    }

    const item = memoryStore.quotes.find((q) => String(q._id) === id);
    if (!item) throw new AppError(404, "Quote request not found.");
    item.status = update.status;
    if (update.internalNotes !== undefined) {
      item.internalNotes = update.internalNotes;
    }
    item.updatedAt = new Date().toISOString();
    saveLocalStore(memoryStore);
    return item;
  },

  // --- BLOG POSTS ---
  async listBlogPosts(includeUnpublished = false) {
    assertDatabaseAvailable();
    if (getDbMode() === "mongodb") {
      const filter = includeUnpublished ? {} : { published: true };
      return BlogPostModel.find(filter).sort({ publishedAt: -1 }).lean();
    }
    return memoryStore.blogs.filter((b) =>
      includeUnpublished ? true : b.published !== false
    );
  },

  async getBlogPostBySlug(slug: string, includeUnpublished = false) {
    assertDatabaseAvailable();
    if (getDbMode() === "mongodb") {
      const filter: Record<string, any> = { slug: slug.toLowerCase() };
      if (!includeUnpublished) filter.published = true;
      return BlogPostModel.findOne(filter).lean();
    }
    return (
      memoryStore.blogs.find(
        (b) =>
          b.slug === slug.toLowerCase() &&
          (includeUnpublished || b.published !== false)
      ) || null
    );
  },

  async upsertBlogPost(input: BlogPostInput) {
    assertDatabaseAvailable();
    const doc = new BlogPostModel({
      ...input,
      slug: input.slug.toLowerCase(),
    });
    const validationError = doc.validateSync();
    if (validationError) throw new AppError(400, validationError.message);

    if (getDbMode() === "mongodb") {
      return BlogPostModel.findOneAndUpdate(
        { slug: input.slug.toLowerCase() },
        { $set: { ...input, slug: input.slug.toLowerCase() } },
        { upsert: true, new: true }
      ).lean();
    }

    const existingIdx = memoryStore.blogs.findIndex(
      (b) => b.slug === input.slug.toLowerCase()
    );
    const now = new Date().toISOString();
    if (existingIdx >= 0) {
      memoryStore.blogs[existingIdx] = {
        ...memoryStore.blogs[existingIdx],
        ...input,
        slug: input.slug.toLowerCase(),
        updatedAt: now,
      };
      saveLocalStore(memoryStore);
      return memoryStore.blogs[existingIdx];
    }

    const created = {
      _id: crypto.randomUUID(),
      ...input,
      slug: input.slug.toLowerCase(),
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    };
    memoryStore.blogs.unshift(created);
    saveLocalStore(memoryStore);
    return created;
  },

  async deleteBlogPost(slug: string) {
    assertDatabaseAvailable();
    if (getDbMode() === "mongodb") {
      const deleted = await BlogPostModel.findOneAndDelete({
        slug: slug.toLowerCase(),
      }).lean();
      if (!deleted) throw new AppError(404, "Blog article not found.");
      return deleted;
    }
    const idx = memoryStore.blogs.findIndex((b) => b.slug === slug.toLowerCase());
    if (idx === -1) throw new AppError(404, "Blog article not found.");
    const [removed] = memoryStore.blogs.splice(idx, 1);
    saveLocalStore(memoryStore);
    return removed;
  },

  // --- PORTFOLIO PROJECTS ---
  async listPortfolioProjects() {
    assertDatabaseAvailable();
    if (getDbMode() === "mongodb") {
      return PortfolioProjectModel.find().sort({ featured: -1, createdAt: -1 }).lean();
    }
    return memoryStore.portfolio;
  },

  async getPortfolioProjectBySlug(slug: string) {
    assertDatabaseAvailable();
    if (getDbMode() === "mongodb") {
      return PortfolioProjectModel.findOne({ slug: slug.toLowerCase() }).lean();
    }
    return (
      memoryStore.portfolio.find((p) => p.slug === slug.toLowerCase()) || null
    );
  },

  async upsertPortfolioProject(input: PortfolioProjectInput) {
    assertDatabaseAvailable();
    const doc = new PortfolioProjectModel({
      ...input,
      slug: input.slug.toLowerCase(),
    });
    const validationError = doc.validateSync();
    if (validationError) throw new AppError(400, validationError.message);

    if (getDbMode() === "mongodb") {
      return PortfolioProjectModel.findOneAndUpdate(
        { slug: input.slug.toLowerCase() },
        { $set: { ...input, slug: input.slug.toLowerCase() } },
        { upsert: true, new: true }
      ).lean();
    }

    const idx = memoryStore.portfolio.findIndex(
      (p) => p.slug === input.slug.toLowerCase()
    );
    const now = new Date().toISOString();
    if (idx >= 0) {
      memoryStore.portfolio[idx] = {
        ...memoryStore.portfolio[idx],
        ...input,
        slug: input.slug.toLowerCase(),
        updatedAt: now,
      };
      saveLocalStore(memoryStore);
      return memoryStore.portfolio[idx];
    }

    const created = {
      _id: crypto.randomUUID(),
      ...input,
      slug: input.slug.toLowerCase(),
      createdAt: now,
      updatedAt: now,
    };
    memoryStore.portfolio.unshift(created);
    saveLocalStore(memoryStore);
    return created;
  },

  async deletePortfolioProject(slug: string) {
    assertDatabaseAvailable();
    const cleanSlug = slug.toLowerCase();
    if (getDbMode() === "mongodb") {
      const deleted = await PortfolioProjectModel.findOneAndDelete({
        slug: cleanSlug,
      }).lean();
      if (!deleted) throw new AppError(404, "Portfolio project not found.");
      return deleted;
    }
    const idx = memoryStore.portfolio.findIndex((p) => p.slug === cleanSlug);
    if (idx === -1) throw new AppError(404, "Portfolio project not found.");
    const [deleted] = memoryStore.portfolio.splice(idx, 1);
    saveLocalStore(memoryStore);
    return deleted;
  },

  // --- TESTIMONIALS (VERIFIED ONLY ON PUBLIC ROUTES) ---
  async listTestimonials(onlyVerified = true) {
    assertDatabaseAvailable();
    if (getDbMode() === "mongodb") {
      const filter = onlyVerified ? { verified: true } : {};
      return TestimonialModel.find(filter).sort({ createdAt: -1 }).lean();
    }
    return memoryStore.testimonials.filter((t) =>
      onlyVerified ? t.verified === true : true
    );
  },

  async createTestimonial(input: TestimonialInput) {
    assertDatabaseAvailable();
    const doc = new TestimonialModel(input);
    const validationError = doc.validateSync();
    if (validationError) throw new AppError(400, validationError.message);

    if (getDbMode() === "mongodb") {
      const saved = await doc.save();
      return saved.toObject();
    }
    const created = {
      _id: crypto.randomUUID(),
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryStore.testimonials.unshift(created);
    saveLocalStore(memoryStore);
    return created;
  },

  // --- SERVICE SEO OVERRIDES ---
  async listServiceSeoOverrides() {
    assertDatabaseAvailable();
    if (getDbMode() === "mongodb") {
      return ServiceSeoOverrideModel.find().lean();
    }
    return memoryStore.serviceSeoOverrides;
  },

  async upsertServiceSeoOverride(input: ServiceSeoOverrideInput) {
    assertDatabaseAvailable();
    const doc = new ServiceSeoOverrideModel({
      ...input,
      slug: input.slug.toLowerCase(),
    });
    const validationError = doc.validateSync();
    if (validationError) throw new AppError(400, validationError.message);

    if (getDbMode() === "mongodb") {
      return ServiceSeoOverrideModel.findOneAndUpdate(
        { slug: input.slug.toLowerCase() },
        { $set: { ...input, slug: input.slug.toLowerCase() } },
        { upsert: true, new: true }
      ).lean();
    }

    const idx = memoryStore.serviceSeoOverrides.findIndex(
      (s) => s.slug === input.slug.toLowerCase()
    );
    const now = new Date().toISOString();
    if (idx >= 0) {
      memoryStore.serviceSeoOverrides[idx] = {
        ...memoryStore.serviceSeoOverrides[idx],
        ...input,
        slug: input.slug.toLowerCase(),
        updatedAt: now,
      };
      saveLocalStore(memoryStore);
      return memoryStore.serviceSeoOverrides[idx];
    }
    const created = {
      _id: crypto.randomUUID(),
      ...input,
      slug: input.slug.toLowerCase(),
      updatedAt: now,
    };
    memoryStore.serviceSeoOverrides.push(created);
    saveLocalStore(memoryStore);
    return created;
  },

  // --- ADMIN AUTHENTICATION ---
  async verifyAdminCredentials(email: string, passwordPlain: string) {
    assertDatabaseAvailable();
    const normalizedEmail = email.trim().toLowerCase();

    if (getDbMode() === "mongodb") {
      const admin = await AdminUserModel.findOne({ email: normalizedEmail }).select(
        "+passwordHash"
      );
      if (!admin) return null;
      const valid = await bcrypt.compare(passwordPlain, admin.passwordHash);
      if (!valid) return null;
      admin.lastLoginAt = new Date();
      await admin.save();
      return {
        id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
      };
    }

    const admin = memoryStore.admins.find((a) => a.email === normalizedEmail);
    if (!admin) return null;
    const valid = await bcrypt.compare(passwordPlain, admin.passwordHash);
    if (!valid) return null;
    admin.lastLoginAt = new Date().toISOString();
    saveLocalStore(memoryStore);
    return {
      id: String(admin._id),
      email: admin.email as string,
      role: (admin.role || "superadmin") as "superadmin" | "editor",
    };
  },

  async updateAdminCredentials(
    currentEmail: string,
    currentPasswordPlain: string,
    newEmail?: string,
    newPasswordPlain?: string
  ) {
    assertDatabaseAvailable();
    const normalizedCurrent = currentEmail.trim().toLowerCase();

    if (getDbMode() === "mongodb") {
      const admin = await AdminUserModel.findOne({ email: normalizedCurrent }).select(
        "+passwordHash"
      );
      if (!admin) {
        throw new AppError(401, "Admin user account not found.");
      }
      const valid = await bcrypt.compare(currentPasswordPlain, admin.passwordHash);
      if (!valid) {
        throw new AppError(401, "Current password does not match.");
      }

      if (newEmail && newEmail.trim().length > 0) {
        const normalizedNew = newEmail.trim().toLowerCase();
        if (normalizedNew !== normalizedCurrent) {
          const exists = await AdminUserModel.findOne({ email: normalizedNew });
          if (exists) {
            throw new AppError(409, "An administrator with this email address already exists.");
          }
          admin.email = normalizedNew;
        }
      }

      if (newPasswordPlain && newPasswordPlain.length >= 8) {
        admin.passwordHash = await bcrypt.hash(newPasswordPlain, 10);
      }

      await admin.save();
      logger.info("Admin credentials updated successfully in MongoDB", {
        updatedEmail: admin.email,
      });

      return {
        id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
      };
    }

    const admin = memoryStore.admins.find((a) => a.email === normalizedCurrent);
    if (!admin) {
      throw new AppError(401, "Admin user account not found.");
    }
    const valid = await bcrypt.compare(currentPasswordPlain, admin.passwordHash);
    if (!valid) {
      throw new AppError(401, "Current password does not match.");
    }

    if (newEmail && newEmail.trim().length > 0) {
      const normalizedNew = newEmail.trim().toLowerCase();
      if (normalizedNew !== normalizedCurrent) {
        const exists = memoryStore.admins.find((a) => a.email === normalizedNew);
        if (exists) {
          throw new AppError(409, "An administrator with this email address already exists.");
        }
        admin.email = normalizedNew;
      }
    }

    if (newPasswordPlain && newPasswordPlain.length >= 8) {
      admin.passwordHash = await bcrypt.hash(newPasswordPlain, 10);
    }

    admin.updatedAt = new Date().toISOString();
    saveLocalStore(memoryStore);
    logger.info("Admin credentials updated successfully in fallback store");

    return {
      id: String(admin._id),
      email: admin.email,
      role: admin.role || "superadmin",
    };
  },
};

function simulateFailureFlag(flag?: boolean): boolean {
  return Boolean(flag);
}
