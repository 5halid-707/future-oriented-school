"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useI18n, type ApplicationStatus } from "@/components/site/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  LogOut,
  Eye,
  FileText,
  Users,
  Clock,
  CheckCircle2,
  Calendar,
  Download,
  RefreshCw,
  AlertCircle,
  UserCog,
} from "lucide-react";
import { toast } from "sonner";

interface AppRow {
  id: string;
  applicationId: string;
  studentNameAr: string;
  studentNameEn: string | null;
  gradeLevel: string;
  status: ApplicationStatus;
  interviewDate: string | null;
  convertedToStudent: boolean;
  createdAt: string;
  parentName: string;
  parentPhone: string;
}

interface AppDetail extends AppRow {
  birthDate: string;
  gender: string;
  nationality: string;
  parentRelation: string;
  parentEmail: string;
  parentOccupation: string | null;
  city: string;
  district: string | null;
  streetAddress: string | null;
  medicalHistory: string | null;
  allergies: string | null;
  bloodType: string | null;
  emergencyContact: string | null;
  notes: string | null;
  interviewNotes: string | null;
  studentProfileId: string | null;
  documents: { type: string; name: string; dataUrl: string; size: number }[];
  logs: { id: string; action: string; message: string; fromStatus: string | null; toStatus: string | null; createdAt: string; actorEmail: string | null }[];
}

const STATUS_OPTIONS: ApplicationStatus[] = [
  "UNDER_REVIEW",
  "ACCEPTED",
  "INTERVIEW_SCHEDULED",
  "ENROLLED",
  "REJECTED",
];

export default function AdminDashboard() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string | null } | null>(null);
  const [apps, setApps] = useState<AppRow[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0, totalPages: 0 });
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<AppDetail | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<ApplicationStatus | "">("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewNotes, setInterviewNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.push("/admin/login");
        return false;
      }
      const data = await res.json();
      setUser(data.user);
      return true;
    } catch {
      router.push("/admin/login");
      return false;
    }
  }, [router]);

  const fetchApps = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (gradeFilter !== "all") params.set("grade", gradeFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);
      params.set("page", String(pagination.page));
      const res = await fetch(`/api/applications/list?${params}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setApps(data.applications);
      setStats(data.stats);
      setPagination((p) => ({ ...p, total: data.pagination.total, totalPages: data.pagination.totalPages }));
    } catch (e) {
      toast.error(lang === "ar" ? "فشل تحميل البيانات" : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [search, gradeFilter, statusFilter, pagination.page, lang]);

  useEffect(() => {
    checkAuth().then((ok) => ok && fetchApps());
  }, [checkAuth, fetchApps]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const openDetail = async (app: AppRow) => {
    try {
      const res = await fetch(`/api/applications/${app.id}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setSelected(data);
      setNewStatus(data.status);
      setInterviewDate(data.interviewDate ? data.interviewDate.slice(0, 16) : "");
      setInterviewNotes(data.interviewNotes || "");
      setDetailOpen(true);
    } catch {
      toast.error("Failed to load detail");
    }
  };

  const saveChanges = async () => {
    if (!selected) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/applications/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus || undefined,
          interviewDate: interviewDate || null,
          interviewNotes: interviewNotes || null,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      toast.success(lang === "ar" ? "تم الحفظ" : "Saved");
      // Refresh detail
      const detailRes = await fetch(`/api/applications/${selected.id}`);
      const detail = await detailRes.json();
      setSelected(detail);
      setNewStatus(detail.status);
      fetchApps();
    } catch {
      toast.error(lang === "ar" ? "فشل الحفظ" : "Save failed");
    } finally {
      setUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-corporate">
        <Loader2 className="animate-spin text-white" size={32} />
      </div>
    );
  }

  const statCards = [
    { label: t("admin.stat.total"), value: pagination.total, icon: FileText, color: "from-corporate to-corporate-dark" },
    { label: t("admin.stat.review"), value: stats.UNDER_REVIEW || 0, icon: Clock, color: "from-amber-500 to-amber-600" },
    { label: t("admin.stat.accepted"), value: stats.ACCEPTED || 0, icon: CheckCircle2, color: "from-emerald-brand to-emerald-600" },
    { label: t("admin.stat.interview"), value: stats.INTERVIEW_SCHEDULED || 0, icon: Calendar, color: "from-blue-500 to-blue-600" },
    { label: t("admin.stat.enrolled"), value: stats.ENROLLED || 0, icon: Users, color: "from-emerald-700 to-emerald-800" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-corporate/5 to-white">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-corporate/10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-gold/30">
              <img src="/school-logo.jpeg" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-corporate text-sm">{t("admin.dash.title")}</p>
              <p className="text-xs text-corporate/60">
                {t("admin.dash.welcome")} {user.name || user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-corporate hover:bg-corporate/5"
            >
              <Eye size={16} />
              {t("admin.dash.back")}
            </a>
            <Button
              onClick={logout}
              variant="outline"
              className="flex items-center gap-1.5 text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">{t("admin.dash.logout")}</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((s, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${s.color} text-white rounded-2xl p-5 shadow-lg`}
            >
              <div className="flex items-center justify-between mb-2">
                <s.icon size={22} className="text-white/80" />
                <span className="text-3xl font-extrabold">{s.value}</span>
              </div>
              <p className="text-xs font-medium text-white/90">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Automation banner */}
        <div className="bg-gradient-to-r from-emerald-brand/10 via-gold/5 to-corporate/10 border border-emerald-brand/20 rounded-2xl p-5 mb-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-brand flex items-center justify-center text-white shrink-0">
            <RefreshCw size={20} />
          </div>
          <div>
            <h3 className="font-bold text-corporate text-sm mb-1">
              {t("admin.automation.title")}
            </h3>
            <p className="text-xs text-corporate/70 leading-relaxed">
              {t("admin.automation.desc")}
            </p>
          </div>
        </div>

        {/* Filters + table */}
        <div className="bg-white rounded-2xl border border-corporate/10 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-corporate/10 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <h2 className="font-bold text-corporate text-lg flex-1">
              {t("admin.table.title")}
            </h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPagination((p) => ({ ...p, page: 1 }));
                }}
                placeholder={t("admin.table.search")}
                className="h-10 sm:w-56"
              />
              <Select
                value={gradeFilter}
                onValueChange={(v) => {
                  setGradeFilter(v);
                  setPagination((p) => ({ ...p, page: 1 }));
                }}
              >
                <SelectTrigger className="h-10 sm:w-36">
                  <SelectValue placeholder={t("admin.table.filter.grade")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("admin.table.filter.grade")}</SelectItem>
                  {["تمهيدي", "KG1", "KG2", "KG3"].map((g) => (
                    <SelectItem key={g} value={g}>
                      {lang === "ar"
                        ? (g === "تمهيدي" ? "التمهيدي" : `روضة ${g.replace("KG", "")}`)
                        : (g === "تمهيدي" ? "Pre-K" : g)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v);
                  setPagination((p) => ({ ...p, page: 1 }));
                }}
              >
                <SelectTrigger className="h-10 sm:w-40">
                  <SelectValue placeholder={t("admin.table.filter.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("admin.table.filter.status")}</SelectItem>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>{t(`status.${s}`)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto custom-scrollbar">
            {loading ? (
              <div className="p-12 flex items-center justify-center">
                <Loader2 className="animate-spin text-corporate" size={24} />
              </div>
            ) : apps.length === 0 ? (
              <div className="p-12 text-center">
                <AlertCircle className="mx-auto text-corporate/30 mb-2" size={32} />
                <p className="text-sm text-corporate/60">{t("admin.table.empty")}</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-corporate/5 border-b border-corporate/10">
                  <tr>
                    <th className="px-4 py-3 text-start font-semibold text-corporate text-xs uppercase tracking-wider">{t("admin.table.applicant")}</th>
                    <th className="px-4 py-3 text-start font-semibold text-corporate text-xs uppercase tracking-wider hidden sm:table-cell">{t("admin.table.grade")}</th>
                    <th className="px-4 py-3 text-start font-semibold text-corporate text-xs uppercase tracking-wider hidden md:table-cell">{t("admin.table.date")}</th>
                    <th className="px-4 py-3 text-start font-semibold text-corporate text-xs uppercase tracking-wider">{t("admin.table.status")}</th>
                    <th className="px-4 py-3 text-end font-semibold text-corporate text-xs uppercase tracking-wider">{t("admin.table.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map((app) => (
                    <tr key={app.id} className="border-b border-corporate/5 hover:bg-corporate/5 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-corporate">{app.studentNameAr}</p>
                          <p className="text-xs text-corporate/50 font-mono">{app.applicationId}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-corporate/70">
                          {lang === "ar"
                            ? (app.gradeLevel === "تمهيدي" ? "التمهيدي" : `روضة ${app.gradeLevel.replace("KG", "")}`)
                            : (app.gradeLevel === "تمهيدي" ? "Pre-K" : app.gradeLevel)}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-corporate/70 text-xs">
                        {new Date(app.createdAt).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US")}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`status-${app.status} px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1`}>
                          {app.convertedToStudent && <CheckCircle2 size={12} />}
                          {t(`status.${app.status}`)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDetail(app)}
                          className="h-8 flex items-center gap-1.5"
                        >
                          <Eye size={14} />
                          {t("admin.table.view")}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="p-4 border-t border-corporate/10 flex items-center justify-between gap-2">
              <p className="text-xs text-corporate/60">
                {lang === "ar" ? `الصفحة ${pagination.page} من ${pagination.totalPages}` : `Page ${pagination.page} of ${pagination.totalPages}`}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                >
                  {t("form.prev")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                >
                  {t("form.next")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-corporate">
              <UserCog size={20} />
              {t("admin.detail.title")}
              {selected?.applicationId && (
                <span className="text-xs font-mono text-gold ms-2">{selected.applicationId}</span>
              )}
            </DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-5">
              {/* Student */}
              <Section title={t("admin.detail.student")}>
                <Grid>
                  <DetailItem label={t("form.studentNameAr")} value={selected.studentNameAr} />
                  <DetailItem label={t("form.studentNameEn")} value={selected.studentNameEn || "-"} />
                  <DetailItem label={t("form.birthDate")} value={selected.birthDate} />
                  <DetailItem label={t("form.gender")} value={selected.gender === "male" ? t("form.gender.male") : t("form.gender.female")} />
                  <DetailItem label={t("form.gradeLevel")} value={selected.gradeLevel === "تمهيدي" ? (lang === "ar" ? "التمهيدي" : "Pre-K") : (lang === "ar" ? `روضة ${selected.gradeLevel.replace("KG", "")}` : selected.gradeLevel)} />
                  <DetailItem label={t("form.nationality")} value={selected.nationality} />
                </Grid>
              </Section>

              {/* Parent */}
              <Section title={t("admin.detail.parent")}>
                <Grid>
                  <DetailItem label={t("form.parentName")} value={selected.parentName} />
                  <DetailItem label={t("form.parentRelation")} value={selected.parentRelation ? t(`form.parentRelation.${selected.parentRelation}`) : "-"} />
                  <DetailItem label={t("form.parentOccupation")} value={selected.parentOccupation || "-"} />
                  <DetailItem label={t("form.parentPhone")} value={selected.parentPhone} dir="ltr" />
                  <DetailItem label={t("form.parentEmail")} value={selected.parentEmail} dir="ltr" />
                </Grid>
              </Section>

              {/* Contact */}
              <Section title={t("admin.detail.contact")}>
                <Grid>
                  <DetailItem label={t("form.city")} value={selected.city} />
                  <DetailItem label={t("form.district")} value={selected.district || "-"} />
                  <DetailItem label={t("form.streetAddress")} value={selected.streetAddress || "-"} />
                </Grid>
              </Section>

              {/* Medical */}
              {(selected.medicalHistory || selected.allergies || selected.bloodType || selected.emergencyContact) && (
                <Section title={t("admin.detail.medical")}>
                  <Grid>
                    <DetailItem label={t("form.medicalHistory")} value={selected.medicalHistory || "-"} />
                    <DetailItem label={t("form.allergies")} value={selected.allergies || "-"} />
                    <DetailItem label={t("form.bloodType")} value={selected.bloodType || "-"} />
                    <DetailItem label={t("form.emergencyContact")} value={selected.emergencyContact || "-"} dir="ltr" />
                  </Grid>
                </Section>
              )}

              {/* Documents */}
              <Section title={t("admin.detail.documents")}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selected.documents.length === 0 ? (
                    <p className="text-sm text-corporate/50 col-span-2">—</p>
                  ) : (
                    selected.documents.map((doc, i) => (
                      <a
                        key={i}
                        href={doc.dataUrl}
                        download={doc.name}
                        className="flex items-center justify-between bg-corporate/5 hover:bg-corporate/10 border border-corporate/10 rounded-xl px-3 py-2.5 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText size={16} className="text-corporate shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-corporate truncate">{t(`form.doc.${doc.type}`)}</p>
                            <p className="text-xs text-corporate/50 truncate">{doc.name} · {(doc.size / 1024).toFixed(0)} KB</p>
                          </div>
                        </div>
                        <Download size={14} className="text-corporate/60 shrink-0" />
                      </a>
                    ))
                  )}
                </div>
              </Section>

              {/* Convert to student indicator */}
              {selected.convertedToStudent && (
                <div className="bg-emerald-brand/10 border border-emerald-brand/30 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-brand" size={20} />
                  <div>
                    <p className="text-sm font-bold text-emerald-700">{t("admin.detail.converted")}</p>
                    <p className="text-xs text-emerald-600 font-mono">{selected.studentProfileId}</p>
                  </div>
                </div>
              )}

              {/* Status changer + interview */}
              <div className="bg-gradient-to-br from-corporate/5 to-gold/5 border border-corporate/10 rounded-xl p-5 space-y-4">
                <h3 className="font-bold text-corporate text-sm flex items-center gap-2">
                  <UserCog size={18} />
                  {t("admin.detail.status")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-corporate/60 mb-1 block">{t("admin.detail.status")}</Label>
                    <Select value={newStatus} onValueChange={(v) => setNewStatus(v as ApplicationStatus)}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s}>{t(`status.${s}`)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-corporate/60 mb-1 block">{t("admin.detail.interview.date")}</Label>
                    <Input
                      type="datetime-local"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-corporate/60 mb-1 block">{t("admin.detail.interview.notes")}</Label>
                  <Textarea
                    value={interviewNotes}
                    onChange={(e) => setInterviewNotes(e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setDetailOpen(false)}
                  >
                    {t("admin.detail.close")}
                  </Button>
                  <Button
                    onClick={saveChanges}
                    disabled={updating}
                    className="bg-corporate hover:bg-corporate-dark text-white flex items-center gap-1.5"
                  >
                    {updating ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                    {t("admin.detail.save")}
                  </Button>
                </div>
              </div>

              {/* Timeline */}
              <Section title={t("admin.detail.timeline")}>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  {selected.logs.length === 0 ? (
                    <p className="text-sm text-corporate/50">—</p>
                  ) : (
                    selected.logs.map((log) => (
                      <div key={log.id} className="flex items-start gap-3 bg-corporate/5 rounded-lg p-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-corporate mt-1.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-corporate">{log.message}</p>
                          <p className="text-[10px] text-corporate/50 mt-0.5">
                            {new Date(log.createdAt).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")}
                            {log.actorEmail && ` · ${log.actorEmail}`}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Section>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-bold text-corporate text-sm mb-2 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-gold" />
        {title}
      </h3>
      <div className="bg-corporate/5 rounded-xl p-4">{children}</div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">{children}</div>;
}

function DetailItem({ label, value, dir }: { label: string; value: string; dir?: string }) {
  return (
    <div>
      <p className="text-xs text-corporate/50 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-corporate" dir={dir}>{value}</p>
    </div>
  );
}
