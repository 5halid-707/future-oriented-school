"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/site/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Mail, Lock, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.ok && router.push("/admin"))
      .catch(() => {});
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast.success(lang === "ar" ? "تم تسجيل الدخول" : "Signed in");
      router.push("/admin");
    } catch (e: any) {
      toast.error(e.message === "Invalid credentials" ? t("admin.error") : e.message);
    } finally {
      setLoading(false);
    }
  };

  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-corporate via-corporate-dark to-corporate p-4">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-corporate-light/20 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo + title */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-gold/30 mb-4">
            <img src="/school-logo.jpeg" alt={t("brand.name")} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1">
            {t("admin.login.title")}
          </h1>
          <p className="text-white/60 text-sm">{t("admin.login.subtitle")}</p>
        </div>

        {/* Login card */}
        <form onSubmit={submit} className="bg-white rounded-2xl shadow-corporate p-6 sm:p-8 space-y-5">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-corporate mb-1.5 block">
              {t("admin.email")}
            </Label>
            <div className="relative">
              <Mail className="absolute top-1/2 -translate-y-1/2 start-3 text-corporate/40" size={18} />
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                dir="ltr"
                className="h-12 ps-11"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium text-corporate mb-1.5 block">
              {t("admin.password")}
            </Label>
            <div className="relative">
              <Lock className="absolute top-1/2 -translate-y-1/2 start-3 text-corporate/40" size={18} />
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                className="h-12 ps-11"
                autoComplete="current-password"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-corporate hover:bg-corporate-dark text-white flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ShieldCheck size={18} />
            )}
            {loading ? t("admin.signing") : t("admin.signin")}
            {!loading && <ArrowIcon size={18} />}
          </Button>

          <div className="text-center pt-4 border-t border-corporate/10">
            <a href="/" className="inline-flex items-center gap-1 text-xs text-corporate/60 hover:text-corporate">
              <ArrowIcon size={14} className="rotate-180" />
              {t("admin.back")}
            </a>
          </div>
        </form>

        {/* Demo hint */}
        <div className="mt-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center">
          <p className="text-xs text-white/60">
            {lang === "ar"
              ? "بيانات الدخول التجريبية: n7walmostqbl@gmail.com / Admin@2026"
              : "Demo credentials: n7walmostqbl@gmail.com / Admin@2026"}
          </p>
        </div>
      </div>
    </div>
  );
}
