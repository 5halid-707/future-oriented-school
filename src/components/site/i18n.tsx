"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

const dict: Dict = {
  // Brand
  "brand.name": { ar: "مدرسة نحو المستقبل", en: "Future-Oriented School" },
  "brand.short": { ar: "نحو المستقبل", en: "Future-Oriented" },
  "brand.tagline": { ar: "نُعِدّ جيلاً يقود الغد", en: "Preparing a generation to lead tomorrow" },

  // Nav
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.about": { ar: "عن المدرسة", en: "About" },
  "nav.features": { ar: "لماذا نحن", en: "Why Us" },
  "nav.admission": { ar: "التسجيل", en: "Admission" },
  "nav.track": { ar: "متابعة الطلب", en: "Track Application" },
  "nav.contact": { ar: "تواصل معنا", en: "Contact" },
  "nav.admin": { ar: "دخول الإدارة", en: "Admin Login" },

  // Hero
  "hero.eyebrow": { ar: "بوابة القبول والتسجيل الإلكتروني", en: "Online Admission Portal" },
  "hero.title": { ar: "ابدأ رحلة طفلك نحو المستقبل", en: "Start Your Child's Journey to the Future" },
  "hero.subtitle": {
    ar: "نظام قبول وتسجيل إلكتروني متكامل — قدّم طلبك وتابع حالته لحظة بلحظة من أي مكان.",
    en: "A complete online admission & registration system — submit your application and track its status in real-time from anywhere.",
  },
  "hero.cta.apply": { ar: "سجّل الآن", en: "Apply Now" },
  "hero.cta.track": { ar: "تابع طلبك", en: "Track Application" },

  // Stats
  "stat.students": { ar: "طالب وطالبة", en: "Students" },
  "stat.teachers": { ar: "معلم خبير", en: "Expert Teachers" },
  "stat.years": { ar: "سنوات من التميز", en: "Years of Excellence" },
  "stat.success": { ar: "نسبة نجاح", en: "Success Rate" },

  // About
  "about.eyebrow": { ar: "من نحن", en: "Who We Are" },
  "about.title": { ar: "مدرسة نحو المستقبل — صرح تعليمي عالمي", en: "Future-Oriented School — A World-Class Institution" },
  "about.body": {
    ar: "نؤمن بأن كل طفل يستحق فرصة تعليمية استثنائية. نمزج بين المنهج السعودي المعتمد وأحدث الأساليب التربوية العالمية لنُخرج جيلاً مبدعاً واثقاً قادراً على قيادة المستقبل. بيئتنا التعليمية محفّزة وآمنة، يديرها نخبة من المعلمين المعتمدين، مع بنية تحتية تقنية متطورة ومرافق عالمية المستوى.",
    en: "We believe every child deserves an exceptional education. We blend the accredited Saudi curriculum with the latest international pedagogical methods to graduate a creative, confident generation ready to lead the future. Our learning environment is stimulating and safe, led by elite certified teachers, with cutting-edge technology infrastructure and world-class facilities.",
  },
  "about.feature1.title": { ar: "منهج معتمد", en: "Accredited Curriculum" },
  "about.feature1.body": { ar: "منهج سعودي معتمد مع تعليم إلكتروني تكاملي", en: "Accredited Saudi curriculum with integrated e-learning" },
  "about.feature2.title": { ar: "كوادر متميزة", en: "Distinguished Staff" },
  "about.feature2.body": { ar: "نخبة من المعلمين المعتمدين دولياً", en: "Elite internationally-certified teachers" },
  "about.feature3.title": { ar: "مرافق عالمية", en: "World-Class Facilities" },
  "about.feature3.body": { ar: "مختبرات ومكتبات ومرافق رياضية حديثة", en: "Modern labs, libraries, and sports facilities" },

  // Features
  "features.eyebrow": { ar: "لماذا تختارنا", en: "Why Choose Us" },
  "features.title": { ar: "نظام تسجيل إلكتروني متكامل", en: "Integrated Online Admission System" },
  "features.subtitle": { ar: "كل ما يحتاجه ولي الأمر في مكان واحد", en: "Everything a parent needs, in one place" },
  "features.f1.title": { ar: "استمارة تسجيل ذكية", en: "Smart Application Form" },
  "features.f1.body": { ar: "خطوات بسيطة لتعبئة بيانات الطالب ورفع المستندات المطلوبة بكل سهولة.", en: "Simple multi-step form to fill student data and upload required documents with ease." },
  "features.f2.title": { ar: "رفع المستندات", en: "Document Upload" },
  "features.f2.body": { ar: "ارفع شهادة الميلاد والهوية والتقرير الطبي مباشرة عبر التطبيق مع تحقق فوري.", en: "Upload birth certificate, national ID, and medical report directly with instant validation." },
  "features.f3.title": { ar: "متابعة حالة الطلب", en: "Application Tracking" },
  "features.f3.body": { ar: "تابع حالة طلبك لحظة بلحظة: قيد المراجعة، مقبول، موعد المقابلة، المباشرة.", en: "Track your application in real-time: Under Review, Accepted, Interview Scheduled, Enrolled." },
  "features.f4.title": { ar: "أتمتة إدارية", en: "Administrative Automation" },
  "features.f4.body": { ar: "تحويل الطلبات المقبولة تلقائياً إلى ملفات طلاب رسمية دون إدخال يدوي.", en: "Approved applications automatically convert to official student profiles." },
  "features.f5.title": { ar: "تنبيهات فورية", en: "Instant Notifications" },
  "features.f5.body": { ar: "إشعارات بريد إلكتروني لولي الأمر والإدارة عند أي تحديث.", en: "Email notifications to parents and admin on every update." },
  "features.f6.title": { ar: "دعم ثنائي اللغة", en: "Bilingual Support" },
  "features.f6.body": { ar: "واجهة عربية افتراضية مع إمكانية التبديل للإنجليزية بضغطة.", en: "Arabic interface by default with one-tap switch to English." },

  // Status labels
  "status.UNDER_REVIEW": { ar: "قيد المراجعة", en: "Under Review" },
  "status.ACCEPTED": { ar: "مقبول", en: "Accepted" },
  "status.INTERVIEW_SCHEDULED": { ar: "موعد المقابلة", en: "Interview Scheduled" },
  "status.ENROLLED": { ar: "تم المباشرة", en: "Enrolled" },
  "status.REJECTED": { ar: "مرفوض", en: "Rejected" },

  // Apply form
  "form.title": { ar: "استمارة التسجيل الإلكتروني", en: "Online Application Form" },
  "form.subtitle": { ar: "املأ البيانات بدقة لضمان معالجة الطلب", en: "Fill in details accurately to ensure processing" },
  "form.step.student": { ar: "بيانات الطالب", en: "Student Info" },
  "form.step.parent": { ar: "ولي الأمر", en: "Parent / Guardian" },
  "form.step.contact": { ar: "بيانات التواصل", en: "Contact Info" },
  "form.step.medical": { ar: "السجل الطبي", en: "Medical Record" },
  "form.step.documents": { ar: "المستندات", en: "Documents" },
  "form.step.review": { ar: "مراجعة وإرسال", en: "Review & Submit" },

  "form.studentNameAr": { ar: "اسم الطالب (عربي)", en: "Student Name (Arabic)" },
  "form.studentNameEn": { ar: "اسم الطالب (إنجليزي)", en: "Student Name (English)" },
  "form.birthDate": { ar: "تاريخ الميلاد", en: "Date of Birth" },
  "form.gender": { ar: "الجنس", en: "Gender" },
  "form.gender.male": { ar: "ذكر", en: "Male" },
  "form.gender.female": { ar: "أنثى", en: "Female" },
  "form.gradeLevel": { ar: "الصف المراد التسجيل فيه", en: "Grade Level" },
  "form.nationality": { ar: "الجنسية", en: "Nationality" },

  "form.parentName": { ar: "اسم ولي الأمر", en: "Parent Name" },
  "form.parentRelation": { ar: "صلة القرابة", en: "Relationship" },
  "form.parentRelation.father": { ar: "الأب", en: "Father" },
  "form.parentRelation.mother": { ar: "الأم", en: "Mother" },
  "form.parentRelation.guardian": { ar: "الولي", en: "Guardian" },
  "form.parentOccupation": { ar: "المهنة", en: "Occupation" },

  "form.parentPhone": { ar: "رقم الجوال", en: "Phone Number" },
  "form.parentEmail": { ar: "البريد الإلكتروني", en: "Email Address" },
  "form.city": { ar: "المدينة", en: "City" },
  "form.district": { ar: "الحي", en: "District" },
  "form.streetAddress": { ar: "العنوان التفصيلي", en: "Street Address" },

  "form.medicalHistory": { ar: "التاريخ الطبي / أمراض مزمنة", en: "Medical History / Chronic Conditions" },
  "form.allergies": { ar: "الحساسية", en: "Allergies" },
  "form.bloodType": { ar: "فصيلة الدم", en: "Blood Type" },
  "form.emergencyContact": { ar: "جهة اتصال طارئة", en: "Emergency Contact" },
  "form.notes": { ar: "ملاحظات إضافية", en: "Additional Notes" },

  "form.doc.birth": { ar: "شهادة الميلاد", en: "Birth Certificate" },
  "form.doc.id": { ar: "الهوية الوطنية", en: "National ID" },
  "form.doc.medical": { ar: "التقرير الطبي", en: "Medical Report" },
  "form.doc.upload": { ar: "اضغط لرفع الملف أو اسحبه هنا", en: "Click to upload or drag file here" },
  "form.doc.uploaded": { ar: "تم الرفع", en: "Uploaded" },
  "form.doc.required": { ar: "مطلوب", en: "Required" },
  "form.doc.optional": { ar: "اختياري", en: "Optional" },

  "form.next": { ar: "التالي", en: "Next" },
  "form.prev": { ar: "السابق", en: "Previous" },
  "form.submit": { ar: "إرسال الطلب", en: "Submit Application" },
  "form.processing": { ar: "جاري الإرسال...", en: "Submitting..." },

  "form.success.title": { ar: "تم استلام طلبك بنجاح!", en: "Application Submitted Successfully!" },
  "form.success.body": { ar: "احفظ رقم طلبك لمتابعة حالته لاحقاً:", en: "Save your application ID to track its status later:" },
  "form.success.track": { ar: "تابع حالة الطلب", en: "Track Application" },
  "form.success.new": { ar: "تسجيل طلب جديد", en: "New Application" },
  "form.error.required": { ar: "هذا الحقل مطلوب", en: "This field is required" },
  "form.error.email": { ar: "بريد إلكتروني غير صالح", en: "Invalid email address" },
  "form.error.phone": { ar: "رقم جوال غير صالح", en: "Invalid phone number" },

  // Track
  "track.title": { ar: "متابعة حالة الطلب", en: "Track Your Application" },
  "track.subtitle": { ar: "أدخل رقم طلبك أو رقم جوالك لعرض الحالة", en: "Enter your application ID or phone number to check status" },
  "track.input": { ar: "رقم الطلب أو الجوال", en: "Application ID or Phone" },
  "track.submit": { ar: "بحث", en: "Search" },
  "track.notfound": { ar: "لم يتم العثور على طلب. تأكد من البيانات.", en: "No application found. Please verify your details." },
  "track.applicant": { ar: "مقدم الطلب", en: "Applicant" },
  "track.submitted": { ar: "تاريخ التقديم", en: "Submitted" },
  "track.interview": { ar: "موعد المقابلة", en: "Interview Date" },

  // Footer
  "footer.about": { ar: "مدرسة نحو المستقبل — صرح تعليمي عالمي يُعِدّ جيلاً مبدعاً واثقاً.", en: "Future-Oriented School — a world-class institution preparing a creative, confident generation." },
  "footer.quicklinks": { ar: "روابط سريعة", en: "Quick Links" },
  "footer.contact": { ar: "تواصل معنا", en: "Contact" },
  "footer.follow": { ar: "تابعنا على", en: "Follow Us" },
  "footer.rights": { ar: "© 2026 مدرسة نحو المستقبل. جميع الحقوق محفوظة.", en: "© 2026 Future-Oriented School. All rights reserved." },
  "footer.email": { ar: "البريد الإلكتروني", en: "Email" },

  // Admin login
  "admin.login.title": { ar: "تسجيل دخول الإدارة", en: "Admin Login" },
  "admin.login.subtitle": { ar: "لوحة تحكم المشرف — نظام القبول والتسجيل", en: "Admin Dashboard — Admission & Registration" },
  "admin.email": { ar: "البريد الإلكتروني", en: "Email" },
  "admin.password": { ar: "كلمة المرور", en: "Password" },
  "admin.signin": { ar: "دخول", en: "Sign In" },
  "admin.signing": { ar: "جاري الدخول...", en: "Signing in..." },
  "admin.error": { ar: "بيانات الدخول غير صحيحة", en: "Invalid credentials" },
  "admin.back": { ar: "العودة للموقع", en: "Back to site" },

  // Admin dashboard
  "admin.dash.title": { ar: "لوحة التحكم", en: "Dashboard" },
  "admin.dash.welcome": { ar: "مرحباً،", en: "Welcome," },
  "admin.dash.logout": { ar: "تسجيل خروج", en: "Logout" },
  "admin.dash.back": { ar: "عرض الموقع", en: "View Site" },
  "admin.stat.total": { ar: "إجمالي الطلبات", en: "Total Applications" },
  "admin.stat.review": { ar: "قيد المراجعة", en: "Under Review" },
  "admin.stat.accepted": { ar: "مقبولة", en: "Accepted" },
  "admin.stat.enrolled": { ar: "تم المباشرة", en: "Enrolled" },
  "admin.stat.interview": { ar: "مقابلات مجدولة", en: "Interviews Scheduled" },

  "admin.table.title": { ar: "إدارة الطلبات", en: "Applications Management" },
  "admin.table.search": { ar: "بحث برقم الطلب أو الاسم...", en: "Search by ID or name..." },
  "admin.table.filter.grade": { ar: "كل الصفوف", en: "All Grades" },
  "admin.table.filter.status": { ar: "كل الحالات", en: "All Status" },
  "admin.table.applicant": { ar: "مقدم الطلب", en: "Applicant" },
  "admin.table.grade": { ar: "الصف", en: "Grade" },
  "admin.table.status": { ar: "الحالة", en: "Status" },
  "admin.table.date": { ar: "التاريخ", en: "Date" },
  "admin.table.actions": { ar: "إجراءات", en: "Actions" },
  "admin.table.view": { ar: "عرض", en: "View" },
  "admin.table.empty": { ar: "لا توجد طلبات مطابقة", en: "No matching applications" },

  "admin.detail.title": { ar: "تفاصيل الطلب", en: "Application Details" },
  "admin.detail.student": { ar: "بيانات الطالب", en: "Student Information" },
  "admin.detail.parent": { ar: "ولي الأمر", en: "Parent / Guardian" },
  "admin.detail.contact": { ar: "بيانات التواصل", en: "Contact" },
  "admin.detail.medical": { ar: "السجل الطبي", en: "Medical Record" },
  "admin.detail.documents": { ar: "المستندات المرفقة", en: "Attached Documents" },
  "admin.detail.timeline": { ar: "سجل النشاط", en: "Activity Timeline" },
  "admin.detail.status": { ar: "تغيير الحالة", en: "Change Status" },
  "admin.detail.interview": { ar: "تحديد موعد المقابلة", en: "Schedule Interview" },
  "admin.detail.interview.date": { ar: "تاريخ المقابلة", en: "Interview Date" },
  "admin.detail.interview.notes": { ar: "ملاحظات المقابلة", en: "Interview Notes" },
  "admin.detail.save": { ar: "حفظ", en: "Save" },
  "admin.detail.close": { ar: "إغلاق", en: "Close" },
  "admin.detail.convert": { ar: "تحويل إلى ملف طالب", en: "Convert to Student Profile" },
  "admin.detail.converted": { ar: "تم التحويل إلى ملف طالب", en: "Converted to Student Profile" },
  "admin.detail.download": { ar: "تحميل", en: "Download" },

  "admin.automation.title": { ar: "أتمتة تلقائية", en: "Automated Process" },
  "admin.automation.desc": { ar: "يتم تحويل الطلبات المقبولة تلقائياً إلى ملفات طلاب رسمية في قاعدة بيانات المدرسة دون الحاجة لإعادة إدخال البيانات يدوياً.", en: "Approved applications are automatically converted to official student profiles in the school database without manual re-entry." },
};

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (stored === "ar" || stored === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "ar" ? "en" : "ar");
  }, [lang, setLang]);

  const t = useCallback(
    (key: string) => {
      const entry = dict[key];
      if (!entry) return key;
      return entry[lang];
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export type ApplicationStatus =
  | "UNDER_REVIEW"
  | "ACCEPTED"
  | "INTERVIEW_SCHEDULED"
  | "ENROLLED"
  | "REJECTED";

export const STATUS_FLOW: ApplicationStatus[] = [
  "UNDER_REVIEW",
  "ACCEPTED",
  "INTERVIEW_SCHEDULED",
  "ENROLLED",
];
