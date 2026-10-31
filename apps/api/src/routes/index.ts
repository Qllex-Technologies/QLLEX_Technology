import { Router } from "express";
import rateLimit from "express-rate-limit";
import { publicController } from "../controllers/publicController";
import { adminController } from "../controllers/adminController";
import { requireAdminAuth } from "../middleware/auth";

export const apiRouter = Router();

// Rate limiter for public form submissions (spam & abuse protection)
const formSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Max 15 submissions per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many form submissions from this IP address. Please wait 15 minutes before trying again.",
  },
});

// Rate limiter for admin login attempts (brute-force protection)
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many login attempts. Please wait 15 minutes before trying again.",
  },
});

// --- PUBLIC ROUTES ---
apiRouter.get("/health", publicController.healthCheck);
apiRouter.post("/contact", formSubmissionLimiter, publicController.submitContactEnquiry);
apiRouter.post("/quotes", formSubmissionLimiter, publicController.submitQuoteRequest);
apiRouter.get("/blog", publicController.listBlogs);
apiRouter.get("/blog/:slug", publicController.getBlogBySlug);
apiRouter.get("/portfolio", publicController.listPortfolio);
apiRouter.get("/portfolio/:slug", publicController.getPortfolioBySlug);
apiRouter.get("/testimonials", publicController.listVerifiedTestimonials);
apiRouter.get("/services/seo", publicController.listServiceSeoOverrides);

// --- ADMIN AUTH & CMS ROUTES ---
// Note: No public admin registration route exists by design.
apiRouter.post("/admin/login", adminLoginLimiter, adminController.login);
apiRouter.post("/admin/logout", adminController.logout);
apiRouter.get("/admin/me", requireAdminAuth, adminController.me);
apiRouter.get("/admin/overview", requireAdminAuth, adminController.getOverview);
apiRouter.put(
  "/admin/settings/credentials",
  requireAdminAuth,
  adminController.updateCredentials
);
apiRouter.patch(
  "/admin/enquiries/:id",
  requireAdminAuth,
  adminController.updateEnquiryStatus
);
apiRouter.delete(
  "/admin/enquiries/:id",
  requireAdminAuth,
  adminController.deleteEnquiry
);
apiRouter.post(
  "/admin/enquiries/:id/retry-notification",
  requireAdminAuth,
  adminController.retryNotification
);
apiRouter.patch(
  "/admin/quotes/:id",
  requireAdminAuth,
  adminController.updateQuoteStatus
);
apiRouter.post("/admin/blog", requireAdminAuth, adminController.upsertBlogPost);
apiRouter.delete(
  "/admin/blog/:slug",
  requireAdminAuth,
  adminController.deleteBlogPost
);
apiRouter.post(
  "/admin/portfolio",
  requireAdminAuth,
  adminController.upsertPortfolioProject
);
apiRouter.delete(
  "/admin/portfolio/:slug",
  requireAdminAuth,
  adminController.deletePortfolioProject
);
apiRouter.post(
  "/admin/testimonials",
  requireAdminAuth,
  adminController.createTestimonial
);
apiRouter.post(
  "/admin/services/seo",
  requireAdminAuth,
  adminController.upsertServiceSeo
);
