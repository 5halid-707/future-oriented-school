import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim();

    if (!query || query.length < 3) {
      return NextResponse.json(
        { error: "Query must be at least 3 characters" },
        { status: 400 }
      );
    }

    // Try to match by application ID (case-insensitive) or phone number
    const application = await db.application.findFirst({
      where: {
        OR: [
          { applicationId: { contains: query } },
          { parentPhone: { contains: query } },
        ],
      },
      include: {
        logs: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      applicationId: application.applicationId,
      studentNameAr: application.studentNameAr,
      studentNameEn: application.studentNameEn,
      gradeLevel: application.gradeLevel,
      status: application.status,
      interviewDate: application.interviewDate,
      createdAt: application.createdAt,
      logs: application.logs.map((l: any) => ({
        action: l.action,
        message: l.message,
        createdAt: l.createdAt,
      })),
    });
  } catch (e) {
    console.error("Track error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
