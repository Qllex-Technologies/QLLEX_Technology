import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../config/logger";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Array<{ field: string; message: string }>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    const fieldErrors = err.issues.map((issue) => ({
      field: issue.path.join(".") || "payload",
      message: issue.message,
    }));
    res.status(400).json({
      success: false,
      message: "Validation failed. Please check the highlighted fields.",
      errors: fieldErrors,
    });
    return;
  }

  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error("Application error", {
        statusCode: err.statusCode,
        path: req.originalUrl,
        message: err.message,
      });
    }
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors ? { errors: err.errors } : {}),
    });
    return;
  }

  // Handle malformed JSON payload from express.json()
  if (
    err instanceof SyntaxError &&
    "status" in err &&
    (err as { status?: number }).status === 400
  ) {
    res.status(400).json({
      success: false,
      message: "Malformed JSON request body.",
    });
    return;
  }

  const errorMessage = err instanceof Error ? err.message : "Unknown error";
  logger.error("Unhandled server exception", {
    path: req.originalUrl,
    method: req.method,
    error: errorMessage,
  });

  res.status(500).json({
    success: false,
    message:
      "An unexpected server error occurred. Please try again shortly or contact us directly.",
  });
}
