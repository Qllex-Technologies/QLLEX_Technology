import { Request, Response, NextFunction } from "express";
import {
  ContactEnquirySchema,
  QuoteRequestSchema,
  BRAND_CONFIG,
} from "@nexovanta/shared";
import { repository } from "../services/repository";
import { emailService } from "../services/email";
import { whatsAppService } from "../services/whatsapp";
import { getDbMode } from "../config/db";
import { AppError } from "../middleware/error";

export const publicController = {
  async healthCheck(_req: Request, res: Response) {
    const dbMode = getDbMode();
    const isHealthy = dbMode !== "disconnected";
    res.status(isHealthy ? 200 : 503).json({
      success: isHealthy,
      message: isHealthy
        ? "QLLEX Technologies API is operational."
        : "Database connection unavailable.",
      data: {
        service: "qllex-api",
        company: BRAND_CONFIG.name,
        status: isHealthy ? "ok" : "degraded",
        databaseMode: dbMode,
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
      },
    });
  },

  async submitContactEnquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = ContactEnquirySchema.parse(req.body);

      // Honeypot spam trap check
      if (parsed.websiteUrl && parsed.websiteUrl.trim().length > 0) {
        throw new AppError(400, "Automated spam submission rejected.");
      }

      const simulateDbFailure =
        req.headers["x-simulate-db-failure"] === "true";

      const saved = await repository.createEnquiry(parsed, {
        simulateDbFailure,
      });

      const enquiryId = String(saved._id);

      // Email dispatch (never blocks DB persistence if email transport fails)
      let emailResult: any = { delivered: false, mode: "unconfigured" };
      try {
        emailResult = await emailService.notifyNewContactEnquiry({
          ...parsed,
          id: enquiryId,
        });
      } catch (e) {
        emailResult = { delivered: false, mode: "error", error: e instanceof Error ? e.message : String(e) };
      }

      // WhatsApp dispatch (never blocks DB persistence)
      let whatsappResult: any = { delivered: false, mode: "unconfigured" };
      try {
        whatsappResult = await whatsAppService.notifyNewContactEnquiry({
          ...parsed,
          id: enquiryId,
        });
      } catch (e) {
        whatsappResult = { delivered: false, mode: "error", error: e instanceof Error ? e.message : String(e) };
      }

      // Persist delivery status onto enquiry document
      try {
        await repository.updateEnquiryNotification(enquiryId, {
          emailStatus: emailResult.delivered ? "sent" : (emailResult.error ? "failed" : "not_configured"),
          emailError: emailResult.error || "",
          whatsappStatus: whatsappResult.delivered ? "sent" : (whatsappResult.error ? "failed" : "not_configured"),
          whatsappError: whatsappResult.error || "",
        });
      } catch {
        // Notification status update error handled gracefully
      }

      res.status(201).json({
        success: true,
        message:
          "Thank you for contacting QLLEX Technologies. Your enquiry has been recorded and our engineering team will respond within 1 business day.",
        data: {
          referenceId: enquiryId,
          submittedAt: saved.createdAt,
          notificationStatus: emailResult.mode,
          whatsappStatus: whatsappResult.mode,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async submitQuoteRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = QuoteRequestSchema.parse(req.body);

      if (parsed.websiteUrl && parsed.websiteUrl.trim().length > 0) {
        throw new AppError(400, "Automated spam submission rejected.");
      }

      const simulateDbFailure =
        req.headers["x-simulate-db-failure"] === "true";

      const saved = await repository.createQuoteRequest(parsed, {
        simulateDbFailure,
      });

      const quoteId = String(saved._id);

      let emailResult: any = { delivered: false, mode: "unconfigured" };
      try {
        emailResult = await emailService.notifyNewQuoteRequest({
          ...parsed,
          id: quoteId,
        });
      } catch {
        // Resilient
      }

      let whatsappResult: any = { delivered: false, mode: "unconfigured" };
      try {
        whatsappResult = await whatsAppService.notifyNewQuoteRequest({
          ...parsed,
          id: quoteId,
        });
      } catch {
        // Resilient
      }

      res.status(201).json({
        success: true,
        message:
          "Your project quote request has been received. A senior solutions architect will review your scope and follow up within 1 business day.",
        data: {
          referenceId: quoteId,
          submittedAt: saved.createdAt,
          notificationStatus: emailResult.mode,
          whatsappStatus: whatsappResult.mode,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async listBlogs(_req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await repository.listBlogPosts(false);
      res.json({
        success: true,
        message: "Blog articles retrieved.",
        data: posts,
      });
    } catch (err) {
      next(err);
    }
  },

  async getBlogBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await repository.getBlogPostBySlug(req.params.slug, false);
      if (!post) {
        throw new AppError(404, "Blog article not found.");
      }
      res.json({
        success: true,
        message: "Blog article retrieved.",
        data: post,
      });
    } catch (err) {
      next(err);
    }
  },

  async listPortfolio(_req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await repository.listPortfolioProjects();
      res.json({
        success: true,
        message: "Portfolio projects retrieved.",
        data: projects,
      });
    } catch (err) {
      next(err);
    }
  },

  async getPortfolioBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await repository.getPortfolioProjectBySlug(
        req.params.slug
      );
      if (!project) {
        throw new AppError(404, "Case study not found.");
      }
      res.json({
        success: true,
        message: "Case study retrieved.",
        data: project,
      });
    } catch (err) {
      next(err);
    }
  },

  async listVerifiedTestimonials(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const testimonials = await repository.listTestimonials(true);
      res.json({
        success: true,
        message: "Verified testimonials retrieved.",
        data: testimonials,
      });
    } catch (err) {
      next(err);
    }
  },

  async listServiceSeoOverrides(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const overrides = await repository.listServiceSeoOverrides();
      res.json({
        success: true,
        message: "Service SEO overrides retrieved.",
        data: overrides,
      });
    } catch (err) {
      next(err);
    }
  },
};
