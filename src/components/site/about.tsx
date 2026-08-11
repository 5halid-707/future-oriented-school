"use client";

import { BookOpen, Users, Building2, Sparkles } from "lucide-react";
import { useI18n } from "./i18n";

export default function About() {
  const { t, lang } = useI18n();

  const features = [
    { icon: BookOpen, title: t("about.feature1.title"), body: t("about.feature1.body"), color: "from-kid-blue to-kid-cyan" },
    { icon: Users, title: t("about.feature2.title"), body: t("about.feature2.body"), color: "from-kid-orange to-kid-red" },
    { icon: Building2, title: t("about.feature3.title"), body: t("about.feature3.body"), color: "from-kid-green to-emerald-brand" },
  ];

  return (
    <section id="about" className="py-24 bg-kid-soft relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-kid-yellow/20 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-kid-pink/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image - 3D card with real photo */}
          <div className="relative order-2 lg:order-1 perspective-1500">
            <div className="relative card-3d-tilt">
              {/* Decorative offset background layers for 3D effect */}
              <div className="absolute -inset-3 bg-gradient-to-br from-kid-orange to-kid-pink rounded-3xl opacity-20 blur-xl" />
              <div className="absolute -inset-2 bg-gradient-to-br from-kid-blue to-kid-purple rounded-3xl opacity-30" />

              {/* Main image card */}
              <div className="relative rounded-3xl overflow-hidden shadow-3d-pop border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&q=80&auto=format&fit=crop"
                  alt={lang === "ar" ? "أستاذة مع طلابها" : "Teacher with students"}
                  className="w-full aspect-square object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-corporate/40 via-transparent to-transparent" />

                {/* Top corner badge */}
                <div className="absolute top-4 right-4 bg-kid-yellow text-corporate text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles size={12} />
                  {lang === "ar" ? "أساتذة متميزون" : "Distinguished Teachers"}
                </div>

                {/* Bottom caption card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-3d-pop">
                  <p className="text-corporate font-bold text-sm">
                    {t("brand.tagline")}
                  </p>
                  <p className="text-corporate/60 text-xs mt-0.5">
                    {t("brand.name")}
                  </p>
                </div>
              </div>

              {/* Floating accent badge */}
              <div className="absolute -top-4 -left-4 bg-emerald-brand text-white text-xs font-bold px-3 py-2 rounded-full shadow-3d-pop animate-float">
                ✓ {lang === "ar" ? "كوادر معتمدة" : "Certified Staff"}
              </div>

              {/* Floating star */}
              <div className="absolute -bottom-3 -right-3 bg-kid-pink text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-3d-pop animate-wiggle">
                <span className="text-2xl">★</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="inline-block text-sm font-semibold text-kid-orange uppercase tracking-widest mb-3 bg-kid-orange/10 px-3 py-1 rounded-full">
              {t("about.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-corporate mb-6 leading-tight drop-shadow-sm">
              {t("about.title")}
            </h2>
            <p className="text-corporate/70 text-lg leading-relaxed mb-8">
              {t("about.body")}
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border-2 border-corporate/5 p-5 hover:shadow-3d-kid transition-all hover:-translate-y-2 card-3d-lift group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-3d-pop`}>
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
