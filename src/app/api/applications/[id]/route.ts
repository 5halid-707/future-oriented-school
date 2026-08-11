import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    const user = verifyAdminToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const application = await db.application.findUnique({
      where: { id },
      include: {
        logs: {
          orderBy: { createdAt: "desc" },
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
      ...application,
      documents: JSON.parse(application.documents || "[]"),
    });
  } catch (e) {
    console.error("Detail error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    const user = verifyAdminToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const application = await db.application.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const updates: any = {};
    const logs: any[] = [];

    if (body.status && body.status !== application.status) {
      updates.status = body.status;
      logs.push({
        applicationId: application.id,
        action: "STATUS_CHANGED",
        fromStatus: application.status,
        toStatus: body.status,
        message: `Status changed from ${application.status} to ${body.status}`,
        actorEmail: user.email,
      });
    }

    if (body.interviewDate !== undefined) {
      updates.interviewDate = body.interviewDate || null;
      if (body.interviewDate) {
        logs.push({
          applicationId: application.id,
          action: "INTERVIEW_SCHEDULED",
          message: `Interview scheduled for ${body.interviewDate}`,
          actorEmail: user.email,
        });
      }
    }

    if (body.interviewNotes !== undefined) {
      updates.interviewNotes = body.interviewNotes || null;
    }

    // Auto-convert to student profile when status becomes ENROLLED
    if (body.status === "ENROLLED" && !application.convertedToStudent) {
      updates.convertedToStudent = true;
      updates.studentProfileId = `STU-${Date.now().toString(36).toUpperCase()}`;
      logs.push({
        applicationId: application.id,
        action: "CONVERTED_TO_STUDENT",
        message: `Application automatically converted to official student profile (ID: ${updates.studentProfileId})`,
        actorEmail: "system",
      });
    }

    const updated = await db.application.update({
      where: { id: application.id },
      data: updates,
    });

    if (logs.length > 0) {
      await db.activityLog.createMany({ data: logs });
    }

    return NextResponse.json({
      success: true,
      application: updated,
    });
  } catch (e) {
    console.error("Patch error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
