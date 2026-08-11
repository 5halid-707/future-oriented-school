import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { createAdminToken } from "@/lib/auth";
import { rateLimit, sanitizeString, validateEmail, logSecurityEvent, RATE_LIMITS } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    // === SECURITY: Rate limiting (5 login attempts per 15 min per IP) ===
    const rateLimitResponse = rateLimit(req, RATE_LIMITS.LOGIN);
    if (rateLimitResponse) {
      logSecurityEvent({
        type: "RATE_LIMIT",
        ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
        details: "Login rate limit exceeded",
      });
      return rateLimitResponse;
    }

    const body = await req.json();

    // === SECURITY: Input sanitization ===
    const email = sanitizeString(body.email).toLowerCase();
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // === SECURITY: Email format validation ===
    if (!validateEmail(email)) {
      logSecurityEvent({
        type: "INVALID_INPUT",
        ip: req.headers.get("x-forwarded-for") || "unknown",
        email,
        details: "Invalid email format on login",
      });
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      logSecurityEvent({
        type: "LOGIN_FAILED",
        ip: req.headers.get("x-forwarded-for") || "unknown",
        email,
        details: "User not found",
      });
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      logSecurityEvent({
        type: "LOGIN_FAILED",
        ip: req.headers.get("x-forwarded-for") || "unknown",
        email,
        details: "Invalid password",
      });
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    logSecurityEvent({
      type: "LOGIN_SUCCESS",
      ip: req.headers.get("x-forwarded-for") || "unknown",
      email,
    });

    const token = createAdminToken(user.id, user.email);
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
