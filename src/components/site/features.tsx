"use client";

import { FileText, Upload, Activity, RefreshCw, Bell, Languages } from "lucide-react";
import { useI18n } from "./i18n";

export default function Features() {
  const { t } = useI18n();

  const features = [
    { icon: FileText, title: t("features.f1.title"), body: t("features.f1.body"), color: "from-corporate to-corporate-light" },
    { icon: Upload, title: t("features.f2.title"), body: t("features.f2.body"), color: "from-gold to-gold-dark" },
    { icon: Activity, title: t("features.f3.title"), body: t("features.f3.body"), color: "from-emerald-brand to-corporate-light" },
    { icon: RefreshCw, title: t("features.f4.title"), body: t("features.f4.body"), color: "from-corporate-light to-corporate" },
    { icon: Bell, title: t("features.f5.title"), body: t("features.f5.body"), color: "from-gold-dark to-gold" },
    { icon: Languages, title: t("features.f6.title"), body: t("features.f6.body"), color: "from-emerald-brand to-corporate" },
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-corporate/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="inline-block text-sm font-semibold text-gold uppercase tracking-widest mb-3">
            {t("features.eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-corporate mb-4 leading-tight">
            {t("features.title")}
          </h2>
          <p className="text-corporate/70 text-lg">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-corporate/10 shadow-sm hover:shadow-corporate transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 bg-gradient-to-r ${f.color}`} />
              <div className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon size={24} />
                </div>
                <h3 className="font-bold text-corporate text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-corporate/60 leading-relaxed">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
