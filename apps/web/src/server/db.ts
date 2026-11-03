import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://QLLEX_Technology:Qllex30102026@qllex.z63zuro.mongodb.net/Qllex";

const DEFAULT_ADMIN_EMAIL = (
  process.env.ADMIN_BOOTSTRAP_EMAIL || "admin@qllex.example.com"
).toLowerCase();

const DEFAULT_ADMIN_PASSWORD =
  process.env.ADMIN_BOOTSTRAP_PASSWORD || "ChangeMeInProduction!2026";

/* -------------------------------------------------------------------------- */
/*                                1. SCHEMAS                                  */
/* -------------------------------------------------------------------------- */

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
  createdAt: Date;
  updatedAt: Date;
}

const ContactEnquirySchema = new Schema<IContactEnquiry>(
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
  },
  { timestamps: true }
);

export interface IQuoteRequest extends Document {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  projectCategory: string;
  budgetRange?: string;
  desiredTimeline: string;
  requiredFeatures: string[];
  projectDetails: string;
  status: "new" | "in_review" | "contacted" | "archived";
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteRequestSchema = new Schema<IQuoteRequest>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    companyName: { type: String, trim: true, maxlength: 120, default: "" },
    projectCategory: { type: String, required: true, trim: true, maxlength: 100 },
    budgetRange: { type: String, trim: true, maxlength: 100, default: "" },
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

export interface IAdminUser extends Document {
  email: string;
  passwordHash: string;
  role: "superadmin" | "editor";
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["superadmin", "editor"], default: "superadmin" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

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
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
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
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export interface IPortfolioProject extends Document {
  title: string;
  slug: string;
  category: string;
  summary: string;
  techStack: string[];
  verificationLabel: string;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioProjectSchema = new Schema<IPortfolioProject>(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true, maxlength: 400 },
    techStack: { type: [String], required: true },
    verificationLabel: { type: String, default: "Reference Architecture" },
  },
  { timestamps: true }
);

/* -------------------------------------------------------------------------- */
/*                                2. MODELS                                   */
/* -------------------------------------------------------------------------- */

export const EnquiryModel =
  mongoose.models.ContactEnquiry ||
  mongoose.model<IContactEnquiry>("ContactEnquiry", ContactEnquirySchema);

export const QuoteRequestModel =
  mongoose.models.QuoteRequest ||
  mongoose.model<IQuoteRequest>("QuoteRequest", QuoteRequestSchema);

export const AdminUserModel =
  mongoose.models.AdminUser ||
  mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);

export const BlogPostModel =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export const PortfolioProjectModel =
  mongoose.models.PortfolioProject ||
  mongoose.model<IPortfolioProject>("PortfolioProject", PortfolioProjectSchema);

/* -------------------------------------------------------------------------- */
/*                 3. SERVERLESS CONNECTION CACHING & SEED                    */
/* -------------------------------------------------------------------------- */

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
      })
      .then(async (m) => {
        // Bootstrap default admin if not existing
        try {
          const adminExists = await AdminUserModel.findOne({
            email: DEFAULT_ADMIN_EMAIL,
          });
          if (!adminExists) {
            const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
            await AdminUserModel.create({
              email: DEFAULT_ADMIN_EMAIL,
              passwordHash,
              role: "superadmin",
            });
            console.log(`[QLLEX] Bootstrapped admin user: ${DEFAULT_ADMIN_EMAIL}`);
          }
        } catch (bootstrapErr) {
          console.warn("[QLLEX] Admin bootstrap notice:", bootstrapErr);
        }
        return m;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
}
