import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB, AdminUserModel } from "./db";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "qllex-secret-key-32-chars-minimum-production-secure-token-2026";

declare global {
  // eslint-disable-next-line no-var
  var __qllex_override_admin:
    | {
        email: string;
        passwordHash: string;
      }
    | undefined;
}

export interface AdminTokenPayload {
  sub: string;
  email: string;
  role: string;
}

export function signAdminToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

export async function authenticateAdminFromRequest(
  req: Request
): Promise<AdminTokenPayload | null> {
  let token: string | null = null;

  // 1. Check Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  }

  // 2. Check Cookie header
  if (!token) {
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(/qllex_admin_token=([^;]+)/);
      if (match) {
        token = match[1];
      }
    }
  }

  if (!token) return null;
  return verifyAdminToken(token);
}

export async function verifyAdminCredentials(email: string, plainPass: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const defaultEmail = (
    process.env.ADMIN_BOOTSTRAP_EMAIL || "admin@qllex.example.com"
  ).trim().toLowerCase();
  const defaultPassword =
    process.env.ADMIN_BOOTSTRAP_PASSWORD || "ChangeMeInProduction!2026";

  // 1. Check in-memory updated credentials if set during active session
  if (
    global.__qllex_override_admin &&
    normalizedEmail === global.__qllex_override_admin.email.toLowerCase()
  ) {
    const valid = await bcrypt.compare(
      plainPass,
      global.__qllex_override_admin.passwordHash
    );
    if (valid) {
      return {
        id: "admin-active-override",
        email: global.__qllex_override_admin.email,
        role: "superadmin" as const,
      };
    }
  }

  let dbConnected = false;

  // 2. Attempt MongoDB database verification if available
  try {
    await connectDB();
    dbConnected = true;
    const user = await AdminUserModel.findOne({ email: normalizedEmail }).select(
      "+passwordHash"
    );
    if (user) {
      const valid = await bcrypt.compare(plainPass, user.passwordHash);
      if (valid) {
        user.lastLoginAt = new Date();
        await user.save().catch(() => {});
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };
      }
    }
  } catch (err) {
    console.warn(
      "[QLLEX Auth] MongoDB connection standby during admin authentication, falling back to bootstrap check:",
      err
    );
  }

  // 3. Check configured bootstrap credentials (guarantees root administrator access)
  if (normalizedEmail === defaultEmail && plainPass === defaultPassword) {
    if (dbConnected) {
      try {
        const passwordHash = await bcrypt.hash(defaultPassword, 10);
        const created = await AdminUserModel.create({
          email: defaultEmail,
          passwordHash,
          role: "superadmin",
          lastLoginAt: new Date(),
        });
        return {
          id: created._id.toString(),
          email: created.email,
          role: created.role,
        };
      } catch {
        // Already exists or duplicate key
      }
    }

    return {
      id: "admin-root-bootstrap",
      email: defaultEmail,
      role: "superadmin" as const,
    };
  }

  return null;
}
