import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    const user = verifyAdminToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const gradeFilter = searchParams.get("grade") || "all";
    const statusFilter = searchParams.get("status") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 20;

    const where: any = {};
    if (search) {
      where.OR = [
        { applicationId: { contains: search } },
        { studentNameAr: { contains: search } },
        { studentNameEn: { contains: search } },
        { parentName: { contains: search } },
        { parentPhone: { contains: search } },
      ];
    }
    if (gradeFilter !== "all") {
      where.gradeLevel = gradeFilter;
    }
    if (statusFilter !== "all") {
      where.status = statusFilter;
    }

    const [apps, total] = await Promise.all([
      db.application.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          applicationId: true,
          studentNameAr: true,
          studentNameEn: true,
          gradeLevel: true,
          status: true,
          interviewDate: true,
          convertedToStudent: true,
          createdAt: true,
          parentName: true,
          parentPhone: true,
        },
      }),
      db.application.count({ where }),
    ]);

    // Stats
    const stats = await db.application.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    return NextResponse.json({
      applications: apps,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
      stats: stats.reduce((acc: Record<string, number>, s: any) => {
        acc[s.status] = s._count.status;
        return acc;
      }, {}),
    });
  } catch (e) {
    console.error("List error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
