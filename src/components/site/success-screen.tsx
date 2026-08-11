"use client";

import { CheckCircle2, Copy, Search, FilePlus2 } from "lucide-react";
import { useI18n } from "./i18n";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SuccessProps {
  applicationId: string;
  onTrack: () => void;
  onNew: () => void;
}

export default function SuccessScreen({ applicationId, onTrack, onNew }: SuccessProps) {
  const { t, lang } = useI18n();

  const copy = () => {
    navigator.clipboard.writeText(applicationId);
    toast.success(lang === "ar" ? "تم النسخ" : "Copied");
  };

  return (
    <section className="py-24 bg-gradient-to-b from-emerald-brand/5 to-white min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-md w-full px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-emerald-brand/20 shadow-corporate p-8 text-center">
          {/* Animated check */}
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-brand/10 flex items-center justify-center mb-6 animate-bounce" style={{ animationDuration: "1.5s" }}>
            <CheckCircle2 size={48} className="text-emerald-brand" />
          </div>

          <h2 className="text-2xl font-extrabold text-corporate mb-2">
            {t("form.success.title")}
          </h2>
          <p className="text-corporate/70 text-sm mb-6">
            {t("form.success.body")}
          </p>

          {/* Application ID card */}
          <div className="bg-gradient-to-br from-corporate to-corporate-dark text-white rounded-xl p-5 mb-6">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-2">
              {lang === "ar" ? "رقم الطلب" : "Application ID"}
            </p>
            <div className="flex items-center justify-center gap-2">
              <p className="font-mono text-2xl font-bold text-gold">{applicationId}</p>
              <button
                onClick={copy}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Copy"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onTrack}
              className="flex-1 bg-corporate hover:bg-corporate-dark text-white flex items-center justify-center gap-2"
            >
              <Search size={16} />
              {t("form.success.track")}
            </Button>
            <Button
              onClick={onNew}
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <FilePlus2 size={16} />
              {t("form.success.new")}
            </Button>
          </div>

          <p className="text-xs text-corporate/50 mt-6 leading-relaxed">
            {lang === "ar"
              ? "تم إرسال إشعار بريد إلكتروني إلى الإدارة بطلبك. سيتم التواصل معك قريباً."
              : "An email notification has been sent to the administration. We will contact you soon."}
          </p>
        </div>
      </div>
    </section>
  );
}
