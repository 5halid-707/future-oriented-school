import { db } from "../src/lib/db"
import bcrypt from "bcryptjs"

async function seed() {
  const adminEmail = "n7walmostqbl@gmail.com"
  const adminPassword = "Admin@2026" // can be changed from dashboard later

  // Upsert admin user
  const existing = await db.user.findUnique({ where: { email: adminEmail } })
  if (!existing) {
    const hashed = await bcrypt.hash(adminPassword, 10)
    await db.user.create({
      data: {
        email: adminEmail,
        password: hashed,
        name: "Future-Oriented Admin",
        role: "ADMIN",
      },
    })
    console.log(`✓ Admin user created: ${adminEmail} (password: ${adminPassword})`)
  } else {
    console.log(`✓ Admin user already exists: ${adminEmail}`)
  }

  // Sample applications for demo
  const sampleApps = [
    {
      applicationId: "FOSC-2026-0001",
      studentNameAr: "أحمد محمد العتيبي",
      studentNameEn: "Ahmed Al-Otaibi",
      birthDate: "2016-03-15",
      gender: "male",
      gradeLevel: "1",
      nationality: "السعودية",
      parentName: "محمد العتيبي",
      parentRelation: "father",
      parentPhone: "+966501234567",
      parentEmail: "parent1@example.com",
      city: "الرياض",
      district: "النرجس",
      status: "UNDER_REVIEW",
    },
    {
      applicationId: "FOSC-2026-0002",
      studentNameAr: "سارة عبدالله القحطاني",
      studentNameEn: "Sarah Al-Qahtani",
      birthDate: "2015-07-22",
      gender: "female",
      gradeLevel: "2",
      nationality: "السعودية",
      parentName: "عبدالله القحطاني",
      parentRelation: "father",
      parentPhone: "+966502345678",
      parentEmail: "parent2@example.com",
      city: "جدة",
      district: "الزهراء",
      status: "ACCEPTED",
    },
    {
      applicationId: "FOSC-2026-0003",
      studentNameAr: "ليان خالد الشهري",
      studentNameEn: "Layan Al-Shehri",
      birthDate: "2014-11-08",
      gender: "female",
      gradeLevel: "3",
      nationality: "السعودية",
      parentName: "خالد الشهري",
      parentRelation: "father",
      parentPhone: "+966503456789",
      parentEmail: "parent3@example.com",
      city: "الدمام",
      district: "الشاطئ",
      status: "INTERVIEW_SCHEDULED",
      interviewDate: "2026-08-20T10:00",
    },
  ]

  for (const app of sampleApps) {
    const exists = await db.application.findUnique({
      where: { applicationId: app.applicationId },
    })
    if (!exists) {
      await db.application.create({ data: app as any })
      console.log(`✓ Sample app created: ${app.applicationId}`)
    } else {
      console.log(`✓ Sample app already exists: ${app.applicationId}`)
    }
  }

  console.log("\n✓ Seed complete!")
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
