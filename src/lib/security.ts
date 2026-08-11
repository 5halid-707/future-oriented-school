/**
 * Security utilities for protecting against common vulnerabilities:
 * - SQL Injection (Prisma ORM provides parameterized queries by default)
 * - XSS (Cross-Site Scripting)
 * - CSRF (Cross-Site Request Forgery)
 * - Rate Limiting (brute force protection)
 * - Input sanitization
 * - Password hashing
 * - Session token generation
 */

import { NextRequest, NextResponse } from "next/server";

// ============================================
// RATE LIMITING (in-memory, per-IP)
// ============================================
interface RateLimitEntry {
  count: number;
  resetTime: number;
  blocked: boolean;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 5 minutes
if (typeof global !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

interface RateLimitOptions {
  windowMs: number; // time window in milliseconds
  maxRequests: number; // max requests per window
  blockDurationMs?: number; // how long to block after exceeding limit
}

/**
 * Rate limiter - protects against brute force attacks
 * Returns null if allowed, or a NextResponse with 429 if blocked
 */
export function rateLimit(
  req: NextRequest,
  options: RateLimitOptions
): NextResponse | null {
  // Get client IP (consider forwarded headers)
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";

  const key = `${ip}:${req.nextUrl.pathname}`;
  const now = Date.now();

  const entry = rateLimitStore.get(key);

  if (entry) {
    // If blocked, deny
    if (entry.blocked && now < entry.resetTime) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
      return NextResponse.json(
        {
          error: "Too many requests",
          message: "تم تجاوز الحد المسموح من المحاولات. حاول مرة أخرى لاحقاً.",
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
            "X-RateLimit-Limit": String(options.maxRequests),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(entry.resetTime / 1000)),
          },
        }
      );
    }

    // Reset if window expired
    if (now > entry.resetTime) {
      entry.count = 1;
      entry.resetTime = now + options.windowMs;
      entry.blocked = false;
    } else {
      entry.count++;
      // Check if exceeded
      if (entry.count > options.maxRequests) {
        entry.blocked = true;
        entry.resetTime = now + (options.blockDurationMs || options.windowMs);
        return NextResponse.json(
          {
            error: "Rate limit exceeded",
            message: "تم تجاوز الحد المسموح. تم حظرك مؤقتاً.",
            retryAfter: Math.ceil((entry.resetTime - now) / 1000),
          },
          {
            status: 429,
            headers: {
              "Retry-After": String(Math.ceil((entry.resetTime - now) / 1000)),
            },
          }
        );
      }
    }
  } else {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + options.windowMs,
      blocked: false,
    });
  }

  return null;
}

// ============================================
// INPUT SANITIZATION (XSS protection)
// ============================================

/**
 * Sanitizes a string by removing potentially dangerous characters
 * Protects against XSS attacks
 */
export function sanitizeString(input: string | undefined | null): string {
  if (!input) return "";
  return String(input)
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .replace(/data:/gi, "") // Remove data: protocol
    .replace(/vbscript:/gi, "") // Remove vbscript: protocol
    .slice(0, 1000); // Limit length
}

/**
 * Validates email format strictly
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validates phone number format (international)
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Validates Saudi phone numbers specifically
 */
export function validateSaudiPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  // Saudi: +966 5X XXX XXXX or 05X XXX XXXX
  const saudiRegex = /^(\+966|0)?5\d{8}$/;
  return saudiRegex.test(cleaned);
}

/**
 * Validates file upload (type + size)
 */
export function validateFileUpload(
  file: { type: string; size: number },
  allowedTypes: string[] = ["image/jpeg", "image/png", "image/webp", "application/pdf"],
  maxSizeBytes: number = 5 * 1024 * 1024 // 5MB
): { valid: boolean; error?: string } {
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "نوع الملف غير مسموح" };
  }
  if (file.size > maxSizeBytes) {
    return { valid: false, error: "حجم الملف يتجاوز الحد المسموح" };
  }
  if (file.size === 0) {
    return { valid: false, error: "الملف فارغ" };
  }
  return { valid: true };
}

// ============================================
// CSRF PROTECTION
// ============================================

/**
 * Validates CSRF token from request header
 * Compares against token stored in cookie
 */
export function validateCSRFToken(req: NextRequest): boolean {
  const headerToken = req.headers.get("x-csrf-token");
  const cookieToken = req.cookies.get("csrf-token")?.value;

  if (!headerToken || !cookieToken) return false;
  if (headerToken.length !== cookieToken.length) return false;

  // Constant-time comparison to prevent timing attacks
  let diff = 0;
  for (let i = 0; i < headerToken.length; i++) {
    diff |= headerToken.charCodeAt(i) ^ cookieToken.charCodeAt(i);
  }
  return diff === 0;
}

// ============================================
// SECURITY HEADERS
// ============================================

/**
 * Adds security headers to response
 * Protects against XSS, clickjacking, MIME sniffing, etc.
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(self)");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  // Content Security Policy (allows self + Unsplash + Google Maps + Vercel)
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.google.com https://vercel.live; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' data: https://fonts.gstatic.com; " +
    "connect-src 'self' https://maps.google.com https://vercel.live; " +
    "frame-src 'self' https://maps.google.com https://www.google.com; " +
    "object-src 'none'; " +
    "base-uri 'self'"
  );
  return response;
}

// ============================================
// PASSWORD POLICY
// ============================================

/**
 * Validates password strength
 * Requires: 8+ chars, 1 uppercase, 1 lowercase, 1 number
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (password.length < 8) errors.push("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
  if (!/[A-Z]/.test(password)) errors.push("يجب أن تحتوي على حرف كبير واحد على الأقل");
  if (!/[a-z]/.test(password)) errors.push("يجب أن تحتوي على حرف صغير واحد على الأقل");
  if (!/[0-9]/.test(password)) errors.push("يجب أن تحتوي على رقم واحد على الأقل");
  return { valid: errors.length === 0, errors };
}

// ============================================
// AUDIT LOGGING
// ============================================

/**
 * Logs security-relevant events
 */
export function logSecurityEvent(event: {
  type: "LOGIN_ATTEMPT" | "LOGIN_SUCCESS" | "LOGIN_FAILED" | "RATE_LIMIT" | "CSRF_FAILED" | "INVALID_INPUT";
  ip?: string;
  email?: string;
  details?: string;
}): void {
  const log = {
    timestamp: new Date().toISOString(),
    ...event,
  };
  // In production: send to logging service (LogDNA, Datadog, etc.)
  if (process.env.NODE_ENV === "production") {
    console.error("[SECURITY]", JSON.stringify(log));
  } else {
    console.warn("[SECURITY]", JSON.stringify(log));
  }
}

// ============================================
// CONSTANTS
// ============================================

export const RATE_LIMITS = {
  // Auth endpoints
  LOGIN: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 attempts per 15 min
  REGISTER: { windowMs: 60 * 60 * 1000, maxRequests: 3 }, // 3 per hour
  // Public API
  SUBMIT_APPLICATION: { windowMs: 60 * 60 * 1000, maxRequests: 5 }, // 5 per hour
  TRACK_APPLICATION: { windowMs: 60 * 1000, maxRequests: 30 }, // 30 per minute
  // Admin API
  ADMIN_API: { windowMs: 60 * 1000, maxRequests: 100 }, // 100 per minute
};
