import { z } from "zod";

/**
 * PROJECT ENQUIRY SCHEMA
 * Clean, simple fields as requested:
 * - Full name
 * - Email address
 * - Phone number (optional)
 * - Service required
 * - Estimated budget (optional)
 * - Short project description
 */
export const EnquiryStatusEnum = z.enum([
  "New",
  "Contacted",
  "In Progress",
  "Closed",
]);

export type EnquiryStatus = z.infer<typeof EnquiryStatusEnum>;

export const ContactEnquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Full name cannot exceed 100 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid business email address.")
    .max(160, "Email cannot exceed 160 characters."),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number cannot exceed 30 characters.")
    .optional()
    .or(z.literal("")),
  serviceRequired: z
    .string()
    .trim()
    .min(2, "Please select the service required.")
    .max(120),
  budget: z
    .string()
    .trim()
    .max(80)
    .optional()
    .or(z.literal("")),
  projectDescription: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters describing your project or question.")
    .max(3000, "Project description cannot exceed 3000 characters."),
  companyName: z
    .string()
    .trim()
    .max(120)
    .optional()
    .or(z.literal("")),
  preferredContactMethod: z
    .enum(["email", "phone", "video_call", "whatsapp"])
    .optional(),
  // Anti-spam honeypot (must remain empty)
  websiteUrl: z.string().max(0, "Spam check failed.").optional().or(z.literal("")),
});

export type ContactEnquiryInput = z.infer<typeof ContactEnquirySchema>;

/**
 * QUOTE REQUEST SCHEMA
 */
export const QuoteRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  companyName: z.string().trim().max(120).optional().or(z.literal("")),
  projectCategory: z.string().trim().min(2).max(100),
  budgetRange: z.string().trim().min(1).max(100),
  desiredTimeline: z.string().trim().min(1).max(100),
  requiredFeatures: z.array(z.string()).default([]),
  projectDetails: z.string().trim().min(10).max(5000),
  websiteUrl: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteRequestInput = z.infer<typeof QuoteRequestSchema>;

/**
 * BLOG POST SCHEMA
 */
export const BlogPostSchema = z.object({
  title: z.string().trim().min(3).max(180),
  slug: z.string().trim().min(2).max(180),
  excerpt: z.string().trim().min(10).max(400),
  content: z.string().min(20),
  category: z.string().trim().min(2),
  tags: z.array(z.string()).default([]),
  authorName: z.string().trim().min(2),
  authorRole: z.string().trim().min(2),
  readTimeMinutes: z.number().int().min(1).default(5),
  published: z.boolean().default(true),
  seoTitle: z.string().trim().max(120).optional(),
  seoDescription: z.string().trim().max(260).optional(),
});

export type BlogPostInput = z.infer<typeof BlogPostSchema>;

/**
 * PORTFOLIO PROJECT SCHEMA
 */
export const PortfolioProjectSchema = z.object({
  title: z.string().trim().min(3).max(160),
  slug: z.string().trim().min(2).max(160),
  category: z.string().trim().min(2),
  projectType: z
    .enum(["reference_architecture", "client_engagement", "internal_product"])
    .default("reference_architecture"),
  verificationLabel: z.string().default("Reference Architecture / Illustrative Engineering Case Study"),
  summary: z.string().trim().min(10).max(400),
  challenge: z.string().min(20),
  solution: z.string().min(20),
  architectureOverview: z.string().min(20),
  techStack: z.array(z.string()).min(1),
  deliverables: z.array(z.string()).min(1),
  featured: z.boolean().default(true),
  seoTitle: z.string().trim().max(120).optional(),
  seoDescription: z.string().trim().max(260).optional(),
});

export type PortfolioProjectInput = z.infer<typeof PortfolioProjectSchema>;

/**
 * TESTIMONIAL SCHEMA
 */
export const TestimonialSchema = z.object({
  clientName: z.string().trim().min(2),
  clientRole: z.string().trim().min(2),
  company: z.string().trim().min(2),
  quote: z.string().trim().min(10).max(1000),
  projectSlug: z.string().trim().optional(),
  verified: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export type TestimonialInput = z.infer<typeof TestimonialSchema>;

/**
 * SERVICE SEO OVERRIDE SCHEMA
 */
export const ServiceSeoOverrideSchema = z.object({
  slug: z.string().trim().min(2),
  seoTitle: z.string().trim().min(5).max(120),
  seoDescription: z.string().trim().min(10).max(260),
  heroHeadline: z.string().trim().max(180).optional(),
  heroSubheadline: z.string().trim().max(400).optional(),
});

export type ServiceSeoOverrideInput = z.infer<typeof ServiceSeoOverrideSchema>;

/**
 * ADMIN AUTH & ENQUIRY SCHEMAS
 */
export const AdminLoginSchema = z.object({
  email: z.string().trim().email("Valid admin email is required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;

export const EnquiryStatusUpdateSchema = z.object({
  status: EnquiryStatusEnum,
  internalNotes: z.string().trim().max(2000).optional(),
});

export type EnquiryStatusUpdateInput = z.infer<typeof EnquiryStatusUpdateSchema>;

export const AdminUpdateCredentialsSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required to verify your identity."),
    newEmail: z
      .string()
      .trim()
      .email("Please provide a valid new admin email address.")
      .optional()
      .or(z.literal("")),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters.")
      .optional()
      .or(z.literal("")),
    confirmNewPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length > 0) {
        return data.newPassword === data.confirmNewPassword;
      }
      return true;
    },
    {
      message: "New password and password confirmation do not match.",
      path: ["confirmNewPassword"],
    }
  );

export type AdminUpdateCredentialsInput = z.infer<
  typeof AdminUpdateCredentialsSchema
>;

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
  meta?: Record<string, unknown>;
}
