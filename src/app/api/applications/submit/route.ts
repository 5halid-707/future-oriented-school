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

// Send email notification to admin AND parent via Resend
async function sendAdminNotification(application: any) {
  const adminEmail = "n7walmostqbl@gmail.com";
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  // Build email content
  const subject = `طلب تسجيل جديد #${application.applicationId}`;
  const adminHtml = `
    <div dir="rtl" style="font-family: 'Cairo', sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 24px;">
      <div style="background: linear-gradient(135deg, #0f2c5c, #1d4ed8); padding: 24px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="color: #facc15; margin: 0; font-size: 24px;">روضة نحو المستقبل</h1>
        <p style="color: #fff; margin: 8px 0 0; font-size: 14px;">طلب تسجيل جديد</p>
      </div>
      <div style="background: #fff; padding: 24px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <h2 style="color: #0f2c5c; margin: 0 0 16px; font-size: 20px;">رقم الطلب: ${application.applicationId}</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #64748b; width: 40%;">اسم الطالب:</td><td style="padding: 8px 0; font-weight: 700; color: #0f2c5c;">${application.studentNameAr}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">تاريخ الميلاد:</td><td style="padding: 8px 0; color: #0f2c5c;">${application.birthDate}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">المستوى:</td><td style="padding: 8px 0; color: #0f2c5c;">${application.gradeLevel}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">ولي الأمر:</td><td style="padding: 8px 0; color: #0f2c5c;">${application.parentName}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">الجوال:</td><td style="padding: 8px 0; color: #0f2c5c; direction: ltr; text-align: right;">${application.parentPhone}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">البريد:</td><td style="padding: 8px 0; color: #0f2c5c; direction: ltr; text-align: right;">${application.parentEmail}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">المدينة:</td><td style="padding: 8px 0; color: #0f2c5c;">${application.city}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-radius: 12px; text-align: center;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">💬 يمكن للإدارة مراجعة الطلب وتغيير الحالة من لوحة التحكم</p>
        </div>
        <p style="margin-top: 16px; text-align: center; color: #94a3b8; font-size: 12px;">© 2026 روضة نحو المستقبل</p>
      </div>
    </div>
  `;

  const parentHtml = `
    <div dir="rtl" style="font-family: 'Cairo', sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 24px;">
      <div style="background: linear-gradient(135deg, #0f2c5c, #1d4ed8); padding: 24px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="color: #facc15; margin: 0; font-size: 24px;">روضة نحو المستقبل</h1>
        <p style="color: #fff; margin: 8px 0 0; font-size: 14px;">تم استلام طلبك بنجاح</p>
      </div>
      <div style="background: #fff; padding: 24px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <h2 style="color: #0f2c5c; margin: 0 0 16px; font-size: 20px;">عزيزي ${application.parentName}،</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.8;">تم استلام طلب تسجيل طفلك <strong style="color: #0f2c5c;">${application.studentNameAr}</strong> بنجاح. سيتم مراجعة الطلب والتواصل معك خلال 2-3 أيام عمل.</p>
        <div style="margin: 20px 0; padding: 16px; background: #dbeafe; border-radius: 12px; text-align: center;">
          <p style="margin: 0; color: #1e40af; font-size: 12px;">رقم الطلب الخاص بك</p>
          <p style="margin: 8px 0 0; color: #0f2c5c; font-size: 24px; font-weight: 800; letter-spacing: 1px;">${application.applicationId}</p>
        </div>
        <p style="color: #475569; font-size: 14px;">يمكنك متابعة حالة طلبك في أي وقت باستخدام رقم الطلب أعلاه.</p>
        <div style="margin-top: 24px; padding: 16px; background: #d1fae5; border-radius: 12px;">
          <p style="margin: 0; color: #065f46; font-size: 14px; text-align: center;">📞 للاستفسار: +966 53 209 3435</p>
        </div>
        <p style="margin-top: 16px; text-align: center; color: #94a3b8; font-size: 12px;">© 2026 روضة نحو المستقبل</p>
      </div>
    </div>
  `;

  // Try to send via Resend if API key is configured
  if (RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);

      // Send to admin
      await resend.emails.send({
        from: "Future-Oriented Kindergarten <onboarding@resend.dev>",
        to: adminEmail,
        subject: subject,
        html: adminHtml,
      });

      // Send confirmation to parent
      if (application.parentEmail) {
        await resend.emails.send({
          from: "Future-Oriented Kindergarten <onboarding@resend.dev>",
          to: application.parentEmail,
          subject: "تم استلام طلبك - روضة نحو المستقبل",
          html: parentHtml,
        });
      }

      console.log("✓ Emails sent via Resend to admin + parent");
      return true;
    } catch (e) {
      console.error("Resend error (falling back to console):", e);
    }
  }

  // Fallback: log to console (for local dev / when RESEND_API_KEY is not set)
  console.log(`\n=== NEW APPLICATION NOTIFICATION ===`);
  console.log(`To Admin: ${adminEmail}`);
  console.log(`To Parent: ${application.parentEmail}`);
  console.log(`Application ID: ${application.applicationId}`);
  console.log(`Student: ${application.studentNameAr}`);
  console.log(`Parent: ${application.parentName} (${application.parentPhone})`);
  console.log(`(Set RESEND_API_KEY env var to send real emails)`);
  console.log(`==========================================\n`);

  return true;
}
