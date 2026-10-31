import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "./error";

export interface AdminTokenPayload {
  sub: string;
  email: string;
  role: "superadmin" | "editor";
}

declare global {
  namespace Express {
    interface Request {
      adminUser?: AdminTokenPayload;
    }
  }
}

export function signAdminToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

export function requireAdminAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7).trim();
    } else if (req.cookies && (req.cookies.qllex_admin_token || req.cookies.nexovanta_admin_token)) {
      token = req.cookies.qllex_admin_token || req.cookies.nexovanta_admin_token;
    }

    if (!token) {
      throw new AppError(
        401,
        "Authentication required. Please sign in with valid administrator credentials."
      );
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as AdminTokenPayload;
    if (!decoded || !decoded.email || !decoded.role) {
      throw new AppError(401, "Invalid authentication token.");
    }

    req.adminUser = decoded;
    next();
  } catch (err) {
    if (err instanceof AppError) {
      next(err);
      return;
    }
    next(
      new AppError(
        401,
        "Your session has expired or the token is invalid. Please log in again."
      )
    );
  }
}
