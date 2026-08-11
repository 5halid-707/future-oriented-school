"use client";

import { useState, useEffect } from "react";
import { GraduationCap, FileCheck2, Search, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "./i18n";

interface HeroProps {
  onApply: () => void;
  onTrack: () => void;
}

// Real photos from Unsplash (free for commercial use, no copyright)
const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80&auto=format&fit=crop",
    titleAr: "فصول تفاعلية",
    titleEn: "Interactive Classrooms",
    color: "#f97316",
  },
  {
    url: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=80&auto=format&fit=crop",
    titleAr: "تعلّم ممتع",
    titleEn: "Joyful Learning",
    color: "#22c55e",
  },
  {
    url: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=1200&q=80&auto=format&fit=crop",
    titleAr: "رعاية متخصصة",
    titleEn: "Caring Guidance",
    color: "#3b82f6",
  },
  {
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80&auto=format&fit=crop",
    titleAr: "إبداع وإبداع",
    titleEn: "Creative Expression",
    color: "#a855f7",
  },
];

export default function Hero({ onApply, onTrack }: HeroProps) {
  const { t, lang } = useI18n();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-rotate hero images every 4s
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentImage((c) => (c + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-kid-blue via-kid-purple to-kid-pink" />

      {/* Rotating real photos background (faded) */}
      <div className="absolute inset-0 overflow-hidden">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: i === currentImage ? 0.25 : 0,
              backgroundImage: `url(${img.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px)",
            }}
          />
        ))}
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-corporate/60 via-corporate/40 to-corporate/60" />
      </div>

      {/* Floating shapes */}
      <div className="absolute top-32 right-10 w-72 h-72 rounded-full bg-kid-yellow/30 blur-3xl animate-float" />
      <div className="absolute bottom-32 left-10 w-96 h-96 rounded-full bg-kid-pink/30 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      {/* Floating decorative shapes */}
      <div className="absolute top-24 left-1/4 w-8 h-8 rounded-lg bg-kid-yellow/40 animate-wiggle" />
      <div className="absolute bottom-1/4 right-1/4 w-6 h-6 rounded-full bg-kid-green/40 animate-wiggle" style={{ animationDelay: "0.5s" }} />
      <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-kid-orange/60 animate-float" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-start">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
              <GraduationCap size={16} className="text-kid-yellow" />
              {t("hero.eyebrow")}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6 drop-shadow-lg">
              {t("hero.title")}
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0 drop-shadow">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={onApply}
                className="group inline-flex items-center justify-center gap-2 bg-kid-orange hover:bg-kid-red text-white font-bold px-7 py-3.5 rounded-xl shadow-3d-pop transition-all hover:scale-105 hover:rotate-1"
              >
                <FileCheck2 size={20} />
                {t("hero.cta.apply")}
                <ArrowIcon size={18} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onTrack}
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg"
              >
                <Search size={20} />
                {t("hero.cta.track")}
              </button>
            </div>
          </div>

          {/* Right visual - 3D rotating photo carousel */}
          <div className="hidden lg:flex justify-center items-center perspective-1500">
            <div className="relative w-96 h-96 preserve-3d">
              {/* Main image container with 3D depth */}
              <div className="relative w-full h-full card-3d-tilt z-10">
                {/* Photo carousel */}
                {HERO_IMAGES.map((img, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 rounded-3xl overflow-hidden shadow-3d-pop transition-all duration-700 ${
                      i === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={lang === "ar" ? img.titleAr : img.titleEn}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Image caption */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div
                        className="inline-block text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md"
                        style={{ backgroundColor: img.color }}
                      >
                        ✦ {lang === "ar" ? img.titleAr : img.titleEn}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Decorative frame */}
                <div className="absolute -inset-2 rounded-3xl border-2 border-white/30 pointer-events-none" />
              </div>

              {/* Floating logo badge - placed OUTSIDE image overlap zone, larger and clearer */}
              <div className="absolute -top-8 -right-8 z-30 w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-2xl bg-white p-1.5">
                <img src="/school-logo.jpeg" alt={t("brand.name")} className="w-full h-full object-cover rounded-xl" />
              </div>

              {/* Floating accreditation badges - moved to bottom corners */}
              <div className="absolute -bottom-4 -left-4 z-30 bg-emerald-brand text-white text-xs font-bold px-3 py-2 rounded-full shadow-3d-pop animate-float" style={{ animationDelay: "0.5s" }}>
                ✓ {lang === "ar" ? "معتمد" : "Accredited"}
              </div>
              <div className="absolute top-1/3 -left-8 bg-kid-yellow text-corporate text-xs font-bold px-3 py-2 rounded-full shadow-3d-pop animate-wiggle">
                ★ {lang === "ar" ? "جمعية ترتيل" : "Tarteel"}
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/20">
          {[
            { num: "1,200+", label: t("stat.students"), color: "text-kid-yellow" },
            { num: "85+", label: t("stat.teachers"), color: "text-kid-orange" },
            { num: "15+", label: t("stat.years"), color: "text-kid-green" },
            { num: "98%", label: t("stat.success"), color: "text-kid-pink" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className={`text-2xl sm:text-3xl font-extrabold mb-1 ${s.color} drop-shadow`}>
                {s.num}
              </div>
              <div className="text-xs sm:text-sm text-white/80">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Carousel dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              aria-label={`Image ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === currentImage ? "bg-white w-10" : "bg-white/40 w-2 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
