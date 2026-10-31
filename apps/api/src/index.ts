import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { connectDatabase } from "./config/db";
import { seedInitialData } from "./services/repository";
import { apiRouter } from "./routes";
import { notFoundHandler, errorHandler } from "./middleware/error";

export function createApp() {
  const app = express();

  // Security headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  // CORS allowlist
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow server-to-server (Next.js SSR) requests without Origin header
        if (!origin) {
          callback(null, true);
          return;
        }
        if (env.corsOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(new Error(`Origin ${origin} not allowed by CORS policy.`));
      },
      credentials: true,
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "x-simulate-db-failure",
      ],
    })
  );

  // Global baseline rate limit
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 180,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // Request size limits (prevent oversized payload DoS)
  app.use(express.json({ limit: "64kb" }));
  app.use(express.urlencoded({ extended: true, limit: "64kb" }));
  app.use(cookieParser());

  // Structured request logging
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const durationMs = Date.now() - start;
      if (req.originalUrl !== `${env.API_PREFIX}/health`) {
        logger.info("HTTP request processed", {
          method: req.method,
          path: req.originalUrl,
          statusCode: res.statusCode,
          durationMs,
        });
      }
    });
    next();
  });

  // Mount API routes
  app.use(env.API_PREFIX, apiRouter);

  // 404 & central error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

async function bootstrap() {
  try {
    await connectDatabase();
    await seedInitialData();

    const app = createApp();
    const server = app.listen(env.PORT, () => {
      logger.info(`QLLEX Technologies Express API listening on port ${env.PORT}`, {
        apiPrefix: env.API_PREFIX,
        nodeEnv: env.NODE_ENV,
      });
    });

    const shutdown = () => {
      logger.info("Shutting down API server gracefully...");
      server.close(() => {
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error("Failed to bootstrap Express API server", {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  }
}

if (require.main === module) {
  bootstrap();
}
