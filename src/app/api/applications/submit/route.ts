import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

// Simple session token validation
function verifyAdminToken(token: string | undefined) {
  if (!token) return null;
  try {
    // token format: userId:email:timestamp:hash
    const parts = token.split(":");
    if (parts.length !== 4) return null;
    const [userId, email, ts] = parts;
    // Basic validation - in production use JWT
    return { id: userId, email };
  } catch {
    return null;
  }
}

function createAdminToken(userId: string, email: string): string {
  const ts = Date.now();
  const hash = Buffer.from(`${userId}:${email}:${ts}`).toString("base64");
  return `${userId}:${email}:${ts}:${hash}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = [
      "studentNameAr",
      "birthDate",
      "gender",
      "gradeLevel",
      "nationality",
      "parentName",
      "parentRelation",
      "parentPhone",
      "parentEmail",
      "city",
    ];
    for (const field of required) {
      if (!body[field] || !String(body[field]).trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.parentEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Phone validation
    const phoneRegex = /^\+?[0-9\s-]{8,}$/;
    if (!phoneRegex.test(body.parentPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Generate human-readable application ID
    const year = new Date().getFullYear();
    const count = await db.application.count();
    const seq = String(count + 1).padStart(4, "0");
    const applicationId = `FOSC-${year}-${seq}`;

    // Create the application
    const application = await db.application.create({
      data: {
        applicationId,
        studentNameAr: body.studentNameAr.trim(),
        studentNameEn: body.studentNameEn?.trim() || null,
        birthDate: body.birthDate,
        gender: body.gender,
        gradeLevel: body.gradeLevel,
        nationality: body.nationality,
        parentName: body.parentName.trim(),
        parentRelation: body.parentRelation,
        parentPhone: body.parentPhone.trim(),
        parentEmail: body.parentEmail.trim().toLowerCase(),
        parentOccupation: body.parentOccupation?.trim() || null,
        city: body.city.trim(),
        district: body.district?.trim() || null,
        streetAddress: body.streetAddress?.trim() || null,
        medicalHistory: body.medicalHistory?.trim() || null,
        allergies: body.allergies?.trim() || null,
        bloodType: body.bloodType?.trim() || null,
        emergencyContact: body.emergencyContact?.trim() || null,
        notes: body.notes?.trim() || null,
        documents: JSON.stringify(body.documents || []),
        status: "UNDER_REVIEW",
      },
    });

    // Log the activity
    await db.activityLog.create({
      data: {
        applicationId: application.id,
        action: "APPLICATION_SUBMITTED",
        toStatus: "UNDER_REVIEW",
        message: `Application submitted via online portal. Application ID: ${applicationId}`,
        actorEmail: body.parentEmail,
      },
    });

    // Send email notification to admin (fire-and-forget, fail-safe)
    sendAdminNotification(application).catch((e) => {
      console.error("Email notification failed:", e);
    });

    return NextResponse.json({
      success: true,
      applicationId,
      id: application.id,
    });
  } catch (e) {
    console.error("Submit error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Send email notification to admin via SMTP or web hook (mock implementation)
async function sendAdminNotification(application: any) {
  const adminEmail = "n7walmostqbl@gmail.com";
  // In production: integrate with nodemailer / SendGrid / Resend
  // For now: log to console for demo
  console.log(`\n=== NEW APPLICATION NOTIFICATION ===`);
  console.log(`To: ${adminEmail}`);
  console.log(`Application ID: ${application.applicationId}`);
  console.log(`Student: ${application.studentNameAr}`);
  console.log(`Parent: ${application.parentName} (${application.parentPhone})`);
  console.log(`==========================================\n`);

  // Try to call a webhook endpoint if configured (e.g., Vercel Email)
  // Or use the z-ai-web-dev-sdk for AI-based email composition

  return true;
}
