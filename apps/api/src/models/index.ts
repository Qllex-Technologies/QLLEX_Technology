import mongoose, { Schema, Document } from "mongoose";

/**
 * 1. CONTACT ENQUIRY MODEL
 */
export interface IContactEnquiry extends Document {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  serviceRequired: string;
  budget?: string;
  projectDescription: string;
  preferredContactMethod?: "email" | "phone" | "video_call" | "whatsapp";
  status: "New" | "Contacted" | "In Progress" | "Closed";
  internalNotes?: string;
  ipHash?: string;
  emailNotificationStatus?: "pending" | "sent" | "failed" | "not_configured";
  emailNotificationError?: string;
  emailSentAt?: Date;
  whatsappNotificationStatus?: "pending" | "sent" | "failed" | "not_configured";
  whatsappNotificationError?: string;
  whatsappSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContactEnquiryMongooseSchema = new Schema<IContactEnquiry>(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, maxlength: 30, default: "" },
    companyName: { type: String, trim: true, maxlength: 120, default: "" },
    serviceRequired: { type: String, required: true, trim: true, maxlength: 120 },
    budget: { type: String, trim: true, maxlength: 80, default: "" },
    projectDescription: { type: String, required: true, trim: true, maxlength: 4000 },
    preferredContactMethod: {
      type: String,
      enum: ["email", "phone", "video_call", "whatsapp"],
      default: "email",
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Closed"],
      default: "New",
    },
    internalNotes: { type: String, trim: true, maxlength: 2000, default: "" },
    ipHash: { type: String, select: false },
    emailNotificationStatus: {
      type: String,
      enum: ["pending", "sent", "failed", "not_configured"],
      default: "pending",
    },
    emailNotificationError: { type: String, default: "" },
    emailSentAt: { type: Date },
    whatsappNotificationStatus: {
      type: String,
      enum: ["pending", "sent", "failed", "not_configured"],
      default: "pending",
    },
    whatsappNotificationError: { type: String, default: "" },
    whatsappSentAt: { type: Date },
  },
  { timestamps: true }
);

ContactEnquiryMongooseSchema.index({ createdAt: -1 });
ContactEnquiryMongooseSchema.index({ email: 1, createdAt: -1 });

export const EnquiryModel =
  mongoose.models.ContactEnquiry ||
  mongoose.model<IContactEnquiry>("ContactEnquiry", ContactEnquiryMongooseSchema);

/**
 * 2. PROJECT QUOTE REQUEST MODEL
 */
export interface IQuoteRequest extends Document {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  projectCategory: string;
  budgetRange: string;
  desiredTimeline: string;
  requiredFeatures: string[];
  projectDetails: string;
  status: "new" | "in_review" | "contacted" | "archived";
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteRequestMongooseSchema = new Schema<IQuoteRequest>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    companyName: { type: String, trim: true, maxlength: 120, default: "" },
    projectCategory: { type: String, required: true, trim: true, maxlength: 100 },
    budgetRange: { type: String, required: true, trim: true, maxlength: 100 },
    desiredTimeline: { type: String, required: true, trim: true, maxlength: 100 },
    requiredFeatures: { type: [String], required: true },
    projectDetails: { type: String, required: true, trim: true, maxlength: 5000 },
    status: {
      type: String,
      enum: ["new", "in_review", "contacted", "archived"],
      default: "new",
    },
    internalNotes: { type: String, trim: true, maxlength: 2000, default: "" },
  },
  { timestamps: true }
);

QuoteRequestMongooseSchema.index({ createdAt: -1 });

export const QuoteRequestModel =
  mongoose.models.QuoteRequest ||
  mongoose.model<IQuoteRequest>("QuoteRequest", QuoteRequestMongooseSchema);

/**
 * 3. BLOG POST MODEL
 */
export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  authorName: string;
  authorRole: string;
  readTimeMinutes: number;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostMongooseSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 400 },
    content: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    authorName: { type: String, required: true, trim: true },
    authorRole: { type: String, required: true, trim: true },
    readTimeMinutes: { type: Number, default: 6 },
    published: { type: Boolean, default: true },
    seoTitle: { type: String, trim: true, maxlength: 120 },
    seoDescription: { type: String, trim: true, maxlength: 260 },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

BlogPostMongooseSchema.index({ published: 1, publishedAt: -1 });

export const BlogPostModel =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostMongooseSchema);

/**
 * 4. PORTFOLIO PROJECT MODEL
 */
export interface IPortfolioProject extends Document {
  title: string;
  slug: string;
  category: string;
  projectType: "reference_architecture" | "client_engagement" | "internal_product";
  verificationLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  architectureOverview: string;
  techStack: string[];
  deliverables: string[];
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioProjectMongooseSchema = new Schema<IPortfolioProject>(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, required: true, trim: true },
    projectType: {
      type: String,
      enum: ["reference_architecture", "client_engagement", "internal_product"],
      default: "reference_architecture",
    },
    verificationLabel: {
      type: String,
      default: "Reference Architecture / Illustrative Engineering Case Study",
    },
    summary: { type: String, required: true, trim: true, maxlength: 400 },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    architectureOverview: { type: String, required: true },
    techStack: { type: [String], required: true },
    deliverables: { type: [String], required: true },
    featured: { type: Boolean, default: true },
    seoTitle: { type: String, trim: true, maxlength: 120 },
    seoDescription: { type: String, trim: true, maxlength: 260 },
  },
  { timestamps: true }
);

export const PortfolioProjectModel =
  mongoose.models.PortfolioProject ||
  mongoose.model<IPortfolioProject>("PortfolioProject", PortfolioProjectMongooseSchema);

/**
 * 5. ADMIN USER MODEL
 */
export interface IAdminUser extends Document {
  email: string;
  passwordHash: string;
  role: "superadmin" | "editor";
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserMongooseSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["superadmin", "editor"], default: "superadmin" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export const AdminUserModel =
  mongoose.models.AdminUser ||
  mongoose.model<IAdminUser>("AdminUser", AdminUserMongooseSchema);

/**
 * 6. TESTIMONIAL MODEL
 */
export interface ITestimonial extends Document {
  clientName: string;
  clientRole: string;
  company: string;
  quote: string;
  projectSlug?: string;
  verified: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialMongooseSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true, trim: true },
    clientRole: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    quote: { type: String, required: true, trim: true, maxlength: 1000 },
    projectSlug: { type: String, trim: true },
    verified: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const TestimonialModel =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialMongooseSchema);

/**
 * 7. SERVICE SEO & CONTENT OVERRIDE MODEL
 */
export interface IServiceSeoOverride extends Document {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  updatedAt: Date;
}

const ServiceSeoOverrideMongooseSchema = new Schema<IServiceSeoOverride>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    seoTitle: { type: String, required: true, trim: true, maxlength: 120 },
    seoDescription: { type: String, required: true, trim: true, maxlength: 260 },
    heroHeadline: { type: String, trim: true, maxlength: 180 },
    heroSubheadline: { type: String, trim: true, maxlength: 400 },
  },
  { timestamps: true }
);

export const ServiceSeoOverrideModel =
  mongoose.models.ServiceSeoOverride ||
  mongoose.model<IServiceSeoOverride>("ServiceSeoOverride", ServiceSeoOverrideMongooseSchema);
