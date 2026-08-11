import { db } from "./db";

/**
 * Verify an admin session token. Returns the user info if valid, null otherwise.
 * Token format: userId:email:timestamp:hash
 */
export function verifyAdminToken(token: string | undefined) {
  if (!token) return null;
  try {
    const parts = token.split(":");
    if (parts.length !== 4) return null;
    const [userId, email, ts] = parts;
    // Token is valid for 7 days
    const tsNum = parseInt(ts, 10);
    if (isNaN(tsNum)) return null;
    const ageMs = Date.now() - tsNum;
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    if (ageMs > sevenDays) return null;
    return { id: userId, email };
  } catch {
    return null;
  }
}

export function createAdminToken(userId: string, email: string): string {
  const ts = Date.now();
  const hash = Buffer.from(`${userId}:${email}:${ts}`).toString("base64");
  return `${userId}:${email}:${ts}:${hash}`;
}
