import { Request, Response, NextFunction } from "express";
import {
  AdminLoginSchema,
  AdminUpdateCredentialsSchema,
  EnquiryStatusUpdateSchema,
  BlogPostSchema,
  PortfolioProjectSchema,
  TestimonialSchema,
  ServiceSeoOverrideSchema,
} from "@nexovanta/shared";
import { repository } from "../services/repository";
import { emailService } from "../services/email";
import { whatsAppService } from "../services/whatsapp";
import { signAdminToken } from "../middleware/auth";
import { AppError } from "../middleware/error";
import { env } from "../config/env";

export const adminController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = AdminLoginSchema.parse(req.body);
      const admin = await repository.verifyAdminCredentials(
        parsed.email,
        parsed.password
      );

      if (!admin) {
        throw new AppError(401, "Invalid email or password.");
      }

      const token = signAdminToken({
        sub: admin.id,
        email: admin.email,
        role: admin.role,
      });

      res.cookie("qllex_admin_token", token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 8 * 60 * 60 * 1000, // 8 hours
        path: "/",
      });

      res.json({
        success: true,
        message: "Administrator login successful.",
        data: {
          token,
          user: {
            email: admin.email,
            role: admin.role,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie("qllex_admin_token", { path: "/" });
    res.clearCookie("nexovanta_admin_token", { path: "/" });
    res.json({
      success: true,
      message: "Logged out successfully.",
    });
  },

  async me(req: Request, res: Response) {
    res.json({
      success: true,
      message: "Authenticated administrator profile.",
      data: req.adminUser,
    });
  },

  async getOverview(_req: Request, res: Response, next: NextFunction) {
    try {
      const [
        enquiries,
        quotes,
        blogs,
        portfolio,
        testimonials,
        serviceSeoOverrides,
      ] = await Promise.all([
        repository.listEnquiries(),
        repository.listQuoteRequests(),
        repository.listBlogPosts(true),
        repository.listPortfolioProjects(),
        repository.listTestimonials(false),
        repository.listServiceSeoOverrides(),
      ]);

      const newEnquiriesCount = enquiries.filter(
        (e: any) => (e.status || "").toLowerCase() === "new"
      ).length;
      const contactedCount = enquiries.filter(
        (e: any) => (e.status || "").toLowerCase() === "contacted"
      ).length;
      const inProgressCount = enquiries.filter(
        (e: any) => (e.status || "").toLowerCase() === "in progress"
      ).length;
      const closedCount = enquiries.filter(
        (e: any) => (e.status || "").toLowerCase() === "closed"
      ).length;
      const emailSentCount = enquiries.filter(
        (e: any) => (e.emailNotificationStatus || "").toLowerCase() === "sent"
      ).length;
      const whatsappSentCount = enquiries.filter(
        (e: any) => (e.whatsappNotificationStatus || "").toLowerCase() === "sent"
      ).length;

      res.json({
        success: true,
        message: "Admin CMS overview retrieved.",
        data: {
          stats: {
            totalEnquiries: enquiries.length,
            newEnquiries: newEnquiriesCount,
            contactedEnquiries: contactedCount,
            inProgressEnquiries: inProgressCount,
            closedEnquiries: closedCount,
            emailSentCount,
            whatsappSentCount,
            totalQuotes: quotes.length,
            newQuotes: quotes.filter((q: any) => (q.status || "").toLowerCase() === "new").length,
            totalBlogPosts: blogs.length,
            totalPortfolioProjects: portfolio.length,
            verifiedTestimonials: testimonials.filter((t: any) => t.verified)
              .length,
          },
          enquiries,
          quotes,
          blogs,
          portfolio,
          testimonials,
          serviceSeoOverrides,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async updateCredentials(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = AdminUpdateCredentialsSchema.parse(req.body);
      const currentAdminEmail = req.adminUser?.email;
      if (!currentAdminEmail) {
        throw new AppError(401, "Authentication required.");
      }

      const updated = await repository.updateAdminCredentials(
        currentAdminEmail,
        parsed.currentPassword,
        parsed.newEmail,
        parsed.newPassword
      );

      // Sign fresh token if email changed
      const token = signAdminToken({
        sub: updated.id,
        email: updated.email,
        role: updated.role,
      });

      res.cookie("qllex_admin_token", token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 8 * 60 * 60 * 1000,
        path: "/",
      });

      res.json({
        success: true,
        message:
          "Administrator credentials updated successfully. Please use your new credentials for future logins.",
        data: {
          token,
          user: {
            email: updated.email,
            role: updated.role,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteEnquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await repository.deleteEnquiry(req.params.id);
      res.json({
        success: true,
        message: "Enquiry permanently deleted from database.",
        data: deleted,
      });
    } catch (err) {
      next(err);
    }
  },

  async retryNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const enquiry: any = await repository.getEnquiryById(req.params.id);
      const enquiryId = String(enquiry._id);
      const channel = req.body?.channel || "both"; // "email" | "whatsapp" | "both"

      let emailResult: any = null;
      let whatsappResult: any = null;

      if (channel === "email" || channel === "both") {
        try {
          emailResult = await emailService.notifyNewContactEnquiry({
            fullName: enquiry.fullName,
            email: enquiry.email,
            phone: enquiry.phone,
            serviceRequired: enquiry.serviceRequired,
            budget: enquiry.budget,
            projectDescription: enquiry.projectDescription,
            companyName: enquiry.companyName,
            preferredContactMethod: enquiry.preferredContactMethod,
            id: enquiryId,
          });
        } catch (e) {
          emailResult = { delivered: false, error: e instanceof Error ? e.message : String(e) };
        }
      }

      if (channel === "whatsapp" || channel === "both") {
        try {
          whatsappResult = await whatsAppService.notifyNewContactEnquiry({
            fullName: enquiry.fullName,
            email: enquiry.email,
            phone: enquiry.phone,
            serviceRequired: enquiry.serviceRequired,
            budget: enquiry.budget,
            projectDescription: enquiry.projectDescription,
            companyName: enquiry.companyName,
            preferredContactMethod: enquiry.preferredContactMethod,
            id: enquiryId,
          });
        } catch (e) {
          whatsappResult = { delivered: false, error: e instanceof Error ? e.message : String(e) };
        }
      }

      const updates: any = {};
      if (emailResult) {
        updates.emailStatus = emailResult.delivered ? "sent" : (emailResult.error ? "failed" : "not_configured");
        updates.emailError = emailResult.error || "";
      }
      if (whatsappResult) {
        updates.whatsappStatus = whatsappResult.delivered ? "sent" : (whatsappResult.error ? "failed" : "not_configured");
        updates.whatsappError = whatsappResult.error || "";
      }

      const updatedDoc = await repository.updateEnquiryNotification(enquiryId, updates);

      res.json({
        success: true,
        message: "Notification retry dispatched successfully.",
        data: updatedDoc,
      });
    } catch (err) {
      next(err);
    }
  },

  async deletePortfolioProject(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await repository.deletePortfolioProject(req.params.slug);
      res.json({
        success: true,
        message: "Portfolio project deleted.",
        data: deleted,
      });
    } catch (err) {
      next(err);
    }
  },

  async updateEnquiryStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = EnquiryStatusUpdateSchema.parse(req.body);
      const updated = await repository.updateEnquiryStatus(
        req.params.id,
        parsed
      );
      res.json({
        success: true,
        message: "Enquiry status updated.",
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  },

  async updateQuoteStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = EnquiryStatusUpdateSchema.parse(req.body);
      const updated = await repository.updateQuoteStatus(req.params.id, parsed);
      res.json({
        success: true,
        message: "Quote request status updated.",
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  },

  async upsertBlogPost(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = BlogPostSchema.parse(req.body);
      const saved = await repository.upsertBlogPost(parsed);
      res.status(201).json({
        success: true,
        message: "Blog article saved successfully.",
        data: saved,
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteBlogPost(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await repository.deleteBlogPost(req.params.slug);
      res.json({
        success: true,
        message: "Blog article deleted.",
        data: deleted,
      });
    } catch (err) {
      next(err);
    }
  },

  async upsertPortfolioProject(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const parsed = PortfolioProjectSchema.parse(req.body);
      const saved = await repository.upsertPortfolioProject(parsed);
      res.status(201).json({
        success: true,
        message: "Portfolio project saved successfully.",
        data: saved,
      });
    } catch (err) {
      next(err);
    }
  },

  async createTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = TestimonialSchema.parse(req.body);
      const saved = await repository.createTestimonial(parsed);
      res.status(201).json({
        success: true,
        message: "Testimonial saved.",
        data: saved,
      });
    } catch (err) {
      next(err);
    }
  },

  async upsertServiceSeo(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = ServiceSeoOverrideSchema.parse(req.body);
      const saved = await repository.upsertServiceSeoOverride(parsed);
      res.status(201).json({
        success: true,
        message: "Service SEO metadata saved.",
        data: saved,
      });
    } catch (err) {
      next(err);
    }
  },
};
