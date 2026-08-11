"use client";

import { useState } from "react";
import { useI18n, type ApplicationStatus } from "./i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2, FileSearch, Calendar, Clock, CheckCircle2 } from "lucide-react";

interface TrackResult {
  applicationId: string;
  studentNameAr: string;
  studentNameEn: string | null;
  gradeLevel: string;
  status: ApplicationStatus;
  interviewDate: string | null;
  createdAt: string;
  logs: { action: string; message: string; createdAt: string }[];
}

const STATUS_STEPS: ApplicationStatus[] = [
  "UNDER_REVIEW",
  "ACCEPTED",
  "INTERVIEW_SCHEDULED",
  "ENROLLED",
];

export default function TrackApplication({ onApplyNew }: { onApplyNew: () => void }) {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);
  const [error, setError] = useState("");

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/applications/track?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error === "Application not found" ? t("track.notfound") : data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError(lang === "ar" ? "خطأ في الاتصال" : "Connection error");
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = result ? STATUS_STEPS.indexOf(result.status) : -1;

  return (
    <section id="track" className="py-24 bg-gradient-to-b from-white to-corporate/5">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-corporate items-center justify-center text-white mb-4">
            <FileSearch size={28} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-corporate mb-3">
            {t("track.title")}
          </h2>
          <p className="text-corporate/70">{t("track.subtitle")}</p>
        </div>

        <div className="bg-white rounded-2xl border border-corporate/10 shadow-corporate p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              placeholder={t("track.input")}
              className="h-12 text-base"
              dir="ltr"
            />
            <Button
              onClick={search}
              disabled={loading || !query.trim()}
              className="h-12 bg-corporate hover:bg-corporate-dark text-white px-6 flex items-center gap-2"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
              {t("track.submit")}
            </Button>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={onApplyNew}
                className="mt-2 text-xs text-corporate underline hover:text-corporate-light"
              >
                {t("hero.cta.apply")} →
              </button>
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-6">
              {/* Status header */}
              <div className="bg-gradient-to-br from-corporate to-corporate-dark text-white rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-white/60 text-xs">{t("track.applicant")}</p>
                    <p className="font-bold text-lg">
                      {lang === "ar" ? result.studentNameAr : result.studentNameEn || result.studentNameAr}
                    </p>
                    <p className="text-white/70 text-sm">
                      {lang === "ar" ? "الصف" : "Grade"} {result.gradeLevel}
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="text-white/60 text-xs">{t("track.submitted")}</p>
                    <p className="font-mono text-sm">
                      {new Date(result.createdAt).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US")}
                    </p>
                    <p className="font-mono text-xs text-gold mt-1">{result.applicationId}</p>
                  </div>
                </div>
                {result.interviewDate && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center gap-2">
                    <Calendar size={18} className="text-gold" />
                    <div>
                      <p className="text-white/60 text-xs">{t("track.interview")}</p>
                      <p className="text-white font-medium">
                        {new Date(result.interviewDate).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress tracker */}
              <div>
                <h3 className="text-sm font-bold text-corporate mb-4">
                  {lang === "ar" ? "مراحل الطلب" : "Application Stages"}
                </h3>
                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute top-6 inset-x-0 h-0.5 bg-corporate/10" />
                  <div
                    className="absolute top-6 start-0 h-0.5 bg-emerald-brand transition-all duration-500"
                    style={{
                      width: `${(Math.max(0, currentStepIndex) / (STATUS_STEPS.length - 1)) * 100}%`,
                    }}
                  />
                  <div className="relative grid grid-cols-4 gap-2">
                    {STATUS_STEPS.map((status, i) => {
                      const completed = i <= currentStepIndex;
                      const current = i === currentStepIndex;
                      return (
                        <div key={status} className="flex flex-col items-center text-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                              completed
                                ? "bg-emerald-brand text-white"
                                : "bg-corporate/10 text-corporate/40"
                            } ${current ? "ring-4 ring-emerald-brand/20 scale-110" : ""}`}
                          >
                            {completed ? <CheckCircle2 size={24} /> : <Clock size={20} />}
                          </div>
                          <span className={`text-[10px] sm:text-xs font-medium ${
                            completed ? "text-corporate" : "text-corporate/40"
                          }`}>
                            {t(`status.${status}`)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Activity log */}
              {result.logs.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-corporate mb-3">
                    {lang === "ar" ? "سجل النشاط" : "Activity Log"}
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pe-2">
                    {result.logs.map((log, i) => (
                      <div key={i} className="flex items-start gap-3 bg-corporate/5 rounded-xl p-3">
                        <div className="w-2 h-2 rounded-full bg-corporate mt-1.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-corporate">{log.message}</p>
                          <p className="text-xs text-corporate/50 mt-0.5">
                            {new Date(log.createdAt).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
