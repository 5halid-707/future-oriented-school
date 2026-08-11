"use client";

import { GraduationCap, FileCheck2, Search, ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "./i18n";

interface HeroProps {
  onApply: () => void;
  onTrack: () => void;
}

export default function Hero({ onApply, onTrack }: HeroProps) {
  const { t, lang } = useI18n();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden bg-hero-gradient"
    >
      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #c9a55a 0%, transparent 40%), radial-gradient(circle at 80% 70%, #ffffff 0%, transparent 35%)",
        }}
      />

      {/* Floating shapes */}
      <div className="absolute top-32 right-10 w-72 h-72 rounded-full bg-gold/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-32 left-10 w-96 h-96 rounded-full bg-corporate-light/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-start">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/95 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap size={16} className="text-gold" />
              {t("hero.eyebrow")}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 leading-[1.15]">
              {t("hero.title")}
            </h1>

            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={onApply}
                className="group inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-bold px-7 py-3.5 rounded-xl shadow-gold transition-all hover:scale-105 hover:shadow-xl"
              >
                <FileCheck2 size={20} />
                {t("hero.cta.apply")}
                <ArrowIcon size={18} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onTrack}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-105"
              >
                <Search size={20} />
                {t("hero.cta.track")}
              </button>
            </div>
          </div>

          {/* Right visual */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Logo with rotating ring */}
              <div className="relative w-80 h-80">
                {/* Outer rotating ring */}
                <div
                  className="absolute inset-0 rounded-full animate-spin"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, #c9a55a, transparent, #c9a55a, transparent)",
                    animationDuration: "8s",
                  }}
                />
                {/* Inner container */}
                <div className="absolute inset-4 rounded-full bg-white/95 backdrop-blur-md shadow-2xl flex items-center justify-center p-12">
                  <img
                    src="/school-logo.jpeg"
                    alt={t("brand.name")}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 bg-emerald-brand text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce" style={{ animationDuration: "2.5s" }}>
                  ✓ CPD Accredited
                </div>
                <div className="absolute -bottom-2 -left-2 bg-white text-corporate text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {lang === "ar" ? "جمعية ترتيل" : "Tarteel Association"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10">
          {[
            { num: "1,200+", label: t("stat.students") },
            { num: "85+", label: t("stat.teachers") },
            { num: "15+", label: t("stat.years") },
            { num: "98%", label: t("stat.success") },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-gold mb-1">
                {s.num}
              </div>
              <div className="text-xs sm:text-sm text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
