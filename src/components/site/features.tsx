"use client";

import { FileText, Upload, Activity, RefreshCw, Bell, Languages, Sparkles } from "lucide-react";
import { useI18n } from "./i18n";

export default function Features() {
  const { t } = useI18n();

  const features = [
    { icon: FileText, title: t("features.f1.title"), body: t("features.f1.body"), color: "from-kid-blue to-kid-cyan", bgColor: "bg-kid-blue/10", iconColor: "text-kid-blue" },
    { icon: Upload, title: t("features.f2.title"), body: t("features.f2.body"), color: "from-kid-orange to-kid-red", bgColor: "bg-kid-orange/10", iconColor: "text-kid-orange" },
    { icon: Activity, title: t("features.f3.title"), body: t("features.f3.body"), color: "from-kid-green to-emerald-brand", bgColor: "bg-kid-green/10", iconColor: "text-kid-green" },
    { icon: RefreshCw, title: t("features.f4.title"), body: t("features.f4.body"), color: "from-kid-purple to-kid-pink", bgColor: "bg-kid-purple/10", iconColor: "text-kid-purple" },
    { icon: Bell, title: t("features.f5.title"), body: t("features.f5.body"), color: "from-kid-yellow to-kid-orange", bgColor: "bg-kid-yellow/10", iconColor: "text-kid-yellow" },
    { icon: Languages, title: t("features.f6.title"), body: t("features.f6.body"), color: "from-kid-pink to-kid-purple", bgColor: "bg-kid-pink/10", iconColor: "text-kid-pink" },
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-kid-soft relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-kid-yellow/15 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-kid-blue/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="inline-block text-sm font-semibold text-kid-orange uppercase tracking-widest mb-3 bg-kid-orange/10 px-3 py-1 rounded-full">
            {t("features.eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-corporate mb-4 leading-tight drop-shadow-sm">
            {t("features.title")}
          </h2>
          <p className="text-corporate/70 text-lg">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1500">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border-2 border-corporate/10 shadow-3d-kid hover:shadow-3d-pop transition-all duration-300 hover:-translate-y-3 card-3d-lift overflow-hidden preserve-3d"
              style={{ transform: `perspective(1000px) rotateY(${i % 2 === 0 ? -1 : 1}deg)` }}
            >
              {/* Gradient top bar */}
              <div className={`h-2 bg-gradient-to-r ${f.color}`} />
              <div className="p-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-3d-pop`}>
                  <f.icon size={28} />
                </div>
                <h3 className="font-bold text-corporate text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-corporate/60 leading-relaxed">
                  {f.body}
                </p>

                {/* Hover indicator */}
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-corporate/40 group-hover:text-corporate transition-colors">
                  <Sparkles size={12} />
                  <span>{f.icon === FileText ? "✦" : f.icon === Upload ? "↑" : f.icon === Activity ? "●" : f.icon === RefreshCw ? "↻" : f.icon === Bell ? "🔔" : "🌐"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
