import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const user = verifyAdminToken(token);
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  const dbUser = await (await import("@/lib/db")).db.user.findUnique({
    where: { id: user.id },
    select: { id: true, email: true, name: true, role: true },
  });
  if (!dbUser) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: dbUser });
}
