import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

// Load .env from apps/api or monorepo root
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  API_PREFIX: z.string().default("/api/v1"),
  CORS_ALLOWED_ORIGINS: z
    .string()
    .default("http://localhost:3000,http://127.0.0.1:3000"),
  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required")
    .default("mongodb://127.0.0.1:27017/qllex_db"),
  ALLOW_MEMORY_DB_FALLBACK: z
    .string()
    .default("true")
    .transform((v) => v === "true" || v === "1"),
  JWT_SECRET: z
    .string()
    .min(16, "JWT_SECRET must be at least 16 characters")
    .default("local-dev-only-jwt-secret-key-qllex-2026-placeholder-64chars"),
  JWT_EXPIRES_IN: z.string().default("8h"),
  ADMIN_BOOTSTRAP_EMAIL: z
    .string()
    .email()
    .default("admin@qllex.example.com"),
  ADMIN_BOOTSTRAP_PASSWORD: z
    .string()
    .min(8)
    .default("ChangeMeInProduction!2026"),
  SMTP_HOST: z.string().optional().default(""),
  SMTP_PORT: z.coerce.number().int().default(587),
  SMTP_SECURE: z
    .string()
    .default("false")
    .transform((v) => v === "true" || v === "1"),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),
  EMAIL_FROM: z
    .string()
    .default("QLLEX Technologies Notifications <no-reply@qllex.example.com>"),
  ENQUIRY_NOTIFICATION_EMAIL: z
    .string()
    .email()
    .default("qllextechnologies@gmail.com"),
  // WhatsApp Business Platform / Cloud API Automation
  WHATSAPP_PROVIDER: z.string().optional().default("cloud_api"),
  WHATSAPP_ACCESS_TOKEN: z.string().optional().default(""),
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional().default(""),
  WHATSAPP_RECIPIENT_PHONE: z.string().default("919313188307"),
  WHATSAPP_TEMPLATE_NAME: z.string().optional().default(""),
});

export function validateEnv(rawEnv: NodeJS.ProcessEnv = process.env) {
  const parsed = EnvSchema.safeParse(rawEnv);
  if (!parsed.success) {
    const formatted = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Environment validation failed: ${formatted}`);
  }

  const config = parsed.data;

  // Enforce strict production checks
  if (config.NODE_ENV === "production") {
    const productionErrors: string[] = [];
    if (
      !rawEnv.MONGODB_URI ||
      config.MONGODB_URI.includes("127.0.0.1") ||
      config.MONGODB_URI.includes("localhost")
    ) {
      productionErrors.push(
        "Production requires an explicit remote MONGODB_URI."
      );
    }
    if (
      !rawEnv.JWT_SECRET ||
      config.JWT_SECRET.includes("dev-only") ||
      config.JWT_SECRET.includes("replace-with") ||
      config.JWT_SECRET.length < 32
    ) {
      productionErrors.push(
        "Production requires a strong JWT_SECRET (minimum 32 characters)."
      );
    }
    if (
      config.ADMIN_BOOTSTRAP_PASSWORD === "ChangeMeInProduction!2026" &&
      !rawEnv.ADMIN_BOOTSTRAP_PASSWORD
    ) {
      productionErrors.push(
        "Production requires an explicit ADMIN_BOOTSTRAP_PASSWORD."
      );
    }
    if (productionErrors.length > 0) {
      throw new Error(
        `Production environment security check failed: ${productionErrors.join(" ")}`
      );
    }
  }

  return {
    ...config,
    corsOrigins: config.CORS_ALLOWED_ORIGINS.split(",")
      .map((o) => o.trim())
      .filter(Boolean),
  };
}

export const env = validateEnv();
