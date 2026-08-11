"use client";

import { useState, useRef } from "react";
import { useI18n } from "./i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, FileCheck2, X, CheckCircle2, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface FormState {
  studentNameAr: string;
  studentNameEn: string;
  birthDate: string;
  gender: string;
  gradeLevel: string;
  nationality: string;
  parentName: string;
  parentRelation: string;
  parentOccupation: string;
  parentPhone: string;
  parentEmail: string;
  city: string;
  district: string;
  streetAddress: string;
  medicalHistory: string;
  allergies: string;
  bloodType: string;
  emergencyContact: string;
  notes: string;
  documents: { type: string; name: string; dataUrl: string; size: number }[];
}

interface StepIndicatorProps {
  current: number;
  total: number;
}

const STEPS = [
  "student",
  "parent",
  "contact",
  "medical",
  "documents",
  "review",
] as const;

const empty: FormState = {
  studentNameAr: "",
  studentNameEn: "",
  birthDate: "",
  gender: "",
  gradeLevel: "",
  nationality: "السعودية",
  parentName: "",
  parentRelation: "",
  parentOccupation: "",
  parentPhone: "",
  parentEmail: "",
  city: "",
  district: "",
  streetAddress: "",
  medicalHistory: "",
  allergies: "",
  bloodType: "",
  emergencyContact: "",
  notes: "",
  documents: [],
};

export default function AdmissionForm({ onSuccess }: { onSuccess: (id: string) => void }) {
  const { t, lang } = useI18n();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const fileRefs = {
    birth: useRef<HTMLInputElement>(null),
    id: useRef<HTMLInputElement>(null),
    medical: useRef<HTMLInputElement>(null),
  };

  const set = (k: keyof FormState, v: any) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 0) {
      if (!form.studentNameAr.trim()) errs.studentNameAr = t("form.error.required");
      if (!form.birthDate) errs.birthDate = t("form.error.required");
      if (!form.gender) errs.gender = t("form.error.required");
      if (!form.gradeLevel) errs.gradeLevel = t("form.error.required");
      if (!form.nationality.trim()) errs.nationality = t("form.error.required");
    } else if (s === 1) {
      if (!form.parentName.trim()) errs.parentName = t("form.error.required");
      if (!form.parentRelation) errs.parentRelation = t("form.error.required");
    } else if (s === 2) {
      if (!form.parentPhone.trim()) errs.parentPhone = t("form.error.required");
      else if (!/^\+?[0-9\s-]{8,}$/.test(form.parentPhone)) errs.parentPhone = t("form.error.phone");
      if (!form.parentEmail.trim()) errs.parentEmail = t("form.error.required");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.parentEmail)) errs.parentEmail = t("form.error.email");
      if (!form.city.trim()) errs.city = t("form.error.required");
    } else if (s === 4) {
      const hasBirth = form.documents.some((d) => d.type === "birth");
      const hasId = form.documents.some((d) => d.type === "id");
      if (!hasBirth) errs.doc_birth = t("form.error.required");
      if (!hasId) errs.doc_id = t("form.error.required");
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(STEPS.length - 1, s + 1));
      window.scrollTo({ top: document.getElementById("admission")?.offsetTop || 0, behavior: "smooth" });
    }
  };
  const prev = () => {
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: document.getElementById("admission")?.offsetTop || 0, behavior: "smooth" });
  };

  const handleFile = (type: "birth" | "id" | "medical", file?: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error(lang === "ar" ? "حجم الملف يجب أن يكون أقل من 5MB" : "File must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setForm((p) => ({
        ...p,
        documents: [
          ...p.documents.filter((d) => d.type !== type),
          { type, name: file.name, dataUrl, size: file.size },
        ],
      }));
      toast.success(lang === "ar" ? "تم رفع الملف" : "File uploaded");
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (type: string) => {
    setForm((p) => ({
      ...p,
      documents: p.documents.filter((d) => d.type !== type),
    }));
  };

  const submit = async () => {
    if (!validateStep(4)) {
      setStep(4);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/applications/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast.success(t("form.success.title"));
      onSuccess(data.applicationId);
    } catch (e: any) {
      toast.error(e.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabels = [
    t("form.step.student"),
    t("form.step.parent"),
    t("form.step.contact"),
    t("form.step.medical"),
    t("form.step.documents"),
    t("form.step.review"),
  ];

  return (
    <section id="admission" className="py-24 bg-gradient-to-b from-corporate/5 to-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-corporate mb-3">
            {t("form.title")}
          </h2>
          <p className="text-corporate/70">{t("form.subtitle")}</p>
        </div>

        {/* Stepper */}
        <div className="mb-10 bg-white rounded-2xl border border-corporate/10 shadow-sm p-6">
          <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto custom-scrollbar">
            {stepLabels.map((label, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      i < step
                        ? "bg-emerald-brand text-white"
                        : i === step
                        ? "bg-corporate text-white ring-4 ring-corporate/20"
                        : "bg-corporate/10 text-corporate/50"
                    }`}
                  >
                    {i < step ? <CheckCircle2 size={20} /> : i + 1}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-medium whitespace-nowrap ${
                      i === step ? "text-corporate" : "text-corporate/50"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div
                    className={`h-0.5 w-6 sm:w-12 rounded ${
                      i < step ? "bg-emerald-brand" : "bg-corporate/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl border border-corporate/10 shadow-corporate p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-5">
              <Field label={t("form.studentNameAr")} required error={errors.studentNameAr}>
                <Input
                  value={form.studentNameAr}
                  onChange={(e) => set("studentNameAr", e.target.value)}
                  placeholder={lang === "ar" ? "مثال: أحمد محمد العتيبي" : "e.g., Ahmed Al-Otaibi"}
                  className="h-12"
                />
              </Field>
              <Field label={t("form.studentNameEn")}>
                <Input
                  value={form.studentNameEn}
                  onChange={(e) => set("studentNameEn", e.target.value)}
                  placeholder="e.g., Ahmed Al-Otaibi"
                  className="h-12"
                  dir="ltr"
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={t("form.birthDate")} required error={errors.birthDate}>
                  <Input
                    type="date"
                    value={form.birthDate}
                    onChange={(e) => set("birthDate", e.target.value)}
                    className="h-12"
                  />
                </Field>
                <Field label={t("form.gender")} required error={errors.gender}>
                  <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={lang === "ar" ? "اختر" : "Select"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t("form.gender.male")}</SelectItem>
                      <SelectItem value="female">{t("form.gender.female")}</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={t("form.gradeLevel")} required error={errors.gradeLevel}>
                  <Select value={form.gradeLevel} onValueChange={(v) => set("gradeLevel", v)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={lang === "ar" ? "اختر الصف" : "Select grade"} />
                    </SelectTrigger>
                    <SelectContent>
                      {["1", "2", "3", "4", "5", "6"].map((g) => (
                        <SelectItem key={g} value={g}>
                          {lang === "ar" ? `الصف ${g}` : `Grade ${g}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label={t("form.nationality")} required error={errors.nationality}>
                  <Input
                    value={form.nationality}
                    onChange={(e) => set("nationality", e.target.value)}
                    className="h-12"
                  />
                </Field>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <Field label={t("form.parentName")} required error={errors.parentName}>
                <Input
                  value={form.parentName}
                  onChange={(e) => set("parentName", e.target.value)}
                  className="h-12"
                />
              </Field>
              <Field label={t("form.parentRelation")} required error={errors.parentRelation}>
                <RadioGroup
                  value={form.parentRelation}
                  onValueChange={(v) => set("parentRelation", v)}
                  className="grid grid-cols-3 gap-3"
                >
                  {["father", "mother", "guardian"].map((r) => (
                    <label
                      key={r}
                      htmlFor={`rel-${r}`}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                        form.parentRelation === r
                          ? "border-corporate bg-corporate/5 text-corporate"
                          : "border-corporate/10 text-corporate/60 hover:border-corporate/30"
                      }`}
                    >
                      <RadioGroupItem value={r} id={`rel-${r}`} className="sr-only" />
                      <span className="text-sm font-medium">
                        {t(`form.parentRelation.${r}`)}
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              </Field>
              <Field label={t("form.parentOccupation")}>
                <Input
                  value={form.parentOccupation}
                  onChange={(e) => set("parentOccupation", e.target.value)}
                  className="h-12"
                />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={t("form.parentPhone")} required error={errors.parentPhone}>
                  <Input
                    value={form.parentPhone}
                    onChange={(e) => set("parentPhone", e.target.value)}
                    placeholder="+966 5X XXX XXXX"
                    dir="ltr"
                    className="h-12"
                  />
                </Field>
                <Field label={t("form.parentEmail")} required error={errors.parentEmail}>
                  <Input
                    type="email"
                    value={form.parentEmail}
                    onChange={(e) => set("parentEmail", e.target.value)}
                    placeholder="example@email.com"
                    dir="ltr"
                    className="h-12"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={t("form.city")} required error={errors.city}>
                  <Input
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    className="h-12"
                  />
                </Field>
                <Field label={t("form.district")}>
                  <Input
                    value={form.district}
                    onChange={(e) => set("district", e.target.value)}
                    className="h-12"
                  />
                </Field>
              </div>
              <Field label={t("form.streetAddress")}>
                <Input
                  value={form.streetAddress}
                  onChange={(e) => set("streetAddress", e.target.value)}
                  className="h-12"
                />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <Field label={t("form.medicalHistory")}>
                <Textarea
                  value={form.medicalHistory}
                  onChange={(e) => set("medicalHistory", e.target.value)}
                  rows={3}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={t("form.allergies")}>
                  <Input
                    value={form.allergies}
                    onChange={(e) => set("allergies", e.target.value)}
                    className="h-12"
                  />
                </Field>
                <Field label={t("form.bloodType")}>
                  <Select value={form.bloodType} onValueChange={(v) => set("bloodType", v)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={lang === "ar" ? "اختر" : "Select"} />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label={t("form.emergencyContact")}>
                <Input
                  value={form.emergencyContact}
                  onChange={(e) => set("emergencyContact", e.target.value)}
                  placeholder="+966 5X XXX XXXX"
                  dir="ltr"
                  className="h-12"
                />
              </Field>
              <Field label={t("form.notes")}>
                <Textarea
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={3}
                />
              </Field>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <p className="text-sm text-corporate/70 mb-4">
                {lang === "ar"
                  ? "ارفع المستندات المطلوبة (PDF، JPG، PNG). الحد الأقصى 5MB لكل ملف."
                  : "Upload required documents (PDF, JPG, PNG). Max 5MB per file."}
              </p>
              {[
                { type: "birth" as const, label: t("form.doc.birth"), required: true, err: errors.doc_birth },
                { type: "id" as const, label: t("form.doc.id"), required: true, err: errors.doc_id },
                { type: "medical" as const, label: t("form.doc.medical"), required: false, err: undefined },
              ].map((doc) => {
                const uploaded = form.documents.find((d) => d.type === doc.type);
                return (
                  <div key={doc.type}>
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-sm font-medium text-corporate flex items-center gap-2">
                        {doc.label}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          doc.required ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
                        }`}>
                          {doc.required ? t("form.doc.required") : t("form.doc.optional")}
                        </span>
                      </Label>
                    </div>
                    <input
                      ref={fileRefs[doc.type]}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFile(doc.type, e.target.files?.[0])}
                      className="hidden"
                    />
                    {!uploaded ? (
                      <button
                        onClick={() => fileRefs[doc.type].current?.click()}
                        className={`w-full border-2 border-dashed rounded-2xl py-6 flex flex-col items-center gap-2 transition-all hover:border-corporate hover:bg-corporate/5 ${
                          errors[`doc_${doc.type}`] ? "border-red-300 bg-red-50" : "border-corporate/20"
                        }`}
                      >
                        <Upload className="text-corporate/60" size={24} />
                        <span className="text-xs text-corporate/60">{t("form.doc.upload")}</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-emerald-brand/10 border border-emerald-brand/30 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <FileCheck2 className="text-emerald-brand" size={20} />
                          <div>
                            <p className="text-sm font-medium text-corporate">{uploaded.name}</p>
                            <p className="text-xs text-corporate/50">{(uploaded.size / 1024).toFixed(0)} KB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(doc.type)}
                          className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}
                    {doc.err && <p className="text-xs text-red-500 mt-1">{doc.err}</p>}
                  </div>
                );
              })}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="bg-corporate/5 rounded-xl p-5">
                <h3 className="font-bold text-corporate mb-3 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-emerald-brand" />
                  {t("form.step.review")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <ReviewItem label={t("form.studentNameAr")} value={form.studentNameAr} />
                  <ReviewItem label={t("form.studentNameEn")} value={form.studentNameEn || "-"} />
                  <ReviewItem label={t("form.birthDate")} value={form.birthDate} />
                  <ReviewItem label={t("form.gender")} value={form.gender === "male" ? t("form.gender.male") : t("form.gender.female")} />
                  <ReviewItem label={t("form.gradeLevel")} value={form.gradeLevel ? (lang === "ar" ? `الصف ${form.gradeLevel}` : `Grade ${form.gradeLevel}`) : "-"} />
                  <ReviewItem label={t("form.nationality")} value={form.nationality} />
                  <ReviewItem label={t("form.parentName")} value={form.parentName} />
                  <ReviewItem label={t("form.parentRelation")} value={form.parentRelation ? t(`form.parentRelation.${form.parentRelation}`) : "-"} />
                  <ReviewItem label={t("form.parentPhone")} value={form.parentPhone} dir="ltr" />
                  <ReviewItem label={t("form.parentEmail")} value={form.parentEmail} dir="ltr" />
                  <ReviewItem label={t("form.city")} value={form.city} />
                  <ReviewItem label={t("form.district")} value={form.district || "-"} />
                </div>
              </div>

              <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 flex items-start gap-3">
                <FileCheck2 className="text-gold mt-0.5 shrink-0" size={20} />
                <div className="text-sm text-corporate/80">
                  <p className="font-medium mb-1">
                    {form.documents.length} {lang === "ar" ? "مستند مرفق" : "documents attached"}
                  </p>
                  <ul className="text-xs space-y-0.5">
                    {form.documents.map((d, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-emerald-brand" />
                        {d.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-corporate/5 rounded-xl p-4 text-xs text-corporate/70">
                {lang === "ar"
                  ? "بالضغط على «إرسال الطلب» فإنك تؤكد صحة البيانات المُدخلة، وتوافق على معالجة طلبك وفقاً للسياسة التعليمية للمدرسة."
                  : "By clicking \"Submit Application\", you confirm the accuracy of the entered data and agree to have your application processed according to the school's educational policy."}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-corporate/10">
            <Button
              variant="outline"
              onClick={prev}
              disabled={step === 0}
              className="flex items-center gap-1.5"
            >
              {lang === "ar" ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              {t("form.prev")}
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                onClick={next}
                className="bg-corporate hover:bg-corporate-dark text-white flex items-center gap-1.5"
              >
                {t("form.next")}
                {lang === "ar" ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </Button>
            ) : (
              <Button
                onClick={submit}
                disabled={submitting}
                className="bg-emerald-brand hover:bg-emerald-brand/90 text-white flex items-center gap-1.5"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {t("form.processing")}
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    {t("form.submit")}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-sm font-medium text-corporate mb-1.5 block">
        {label}
        {required && <span className="text-red-500 ms-1">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function ReviewItem({ label, value, dir }: { label: string; value: string; dir?: string }) {
  return (
    <div>
      <p className="text-xs text-corporate/50">{label}</p>
      <p className="font-medium text-corporate" dir={dir}>{value}</p>
    </div>
  );
}
