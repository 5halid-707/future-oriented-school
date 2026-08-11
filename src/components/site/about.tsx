"use client";

import { BookOpen, Users, Building2 } from "lucide-react";
import { useI18n } from "./i18n";

export default function About() {
  const { t } = useI18n();

  const features = [
    { icon: BookOpen, title: t("about.feature1.title"), body: t("about.feature1.body") },
    { icon: Users, title: t("about.feature2.title"), body: t("about.feature2.body") },
    { icon: Building2, title: t("about.feature3.title"), body: t("about.feature3.body") },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 bg-gradient-to-br from-corporate/10 via-gold/10 to-emerald-brand/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-corporate">
              <img
                src="/school-logo.jpeg"
                alt={t("brand.name")}
                className="w-full aspect-square object-cover"
              />
              {/* Floating accent badge */}
              <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg">
                <p className="text-corporate font-bold text-sm">
                  {t("brand.tagline")}
                </p>
                <p className="text-corporate/60 text-xs mt-0.5">
                  {t("brand.name")}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="inline-block text-sm font-semibold text-gold uppercase tracking-widest mb-3">
              {t("about.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-corporate mb-6 leading-tight">
              {t("about.title")}
            </h2>
            <p className="text-corporate/70 text-lg leading-relaxed mb-8">
              {t("about.body")}
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-corporate/5 to-transparent border border-corporate/10 rounded-2xl p-5 hover:shadow-corporate transition-all hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-corporate flex items-center justify-center text-white mb-3">
                    <f.icon size={20} />
                  </div>
                  <h3 className="font-bold text-corporate text-sm mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-xs text-corporate/60 leading-relaxed">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
