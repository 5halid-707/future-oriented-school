"use client";

import { useState, useEffect } from "react";
import { useI18n } from "./i18n";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const CLASSROOMS = [
  { src: "/classroom-1.svg", titleAr: "فصل تفاعلي", titleEn: "Interactive Classroom", color: "from-blue-500 to-cyan-500" },
  { src: "/classroom-2.svg", titleAr: "حلقة قرآنية", titleEn: "Quran Circle", color: "from-purple-500 to-pink-500" },
  { src: "/classroom-3.svg", titleAr: "تعلّم مبكر", titleEn: "Early Learning", color: "from-emerald-500 to-teal-500" },
];

export default function ClassroomGallery() {
  const { t, lang } = useI18n();
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % CLASSROOMS.length);
    }, 4500);
    return () => clearInterval(id);
  }, [autoPlay]);

  const next = () => {
    setAutoPlay(false);
    setCurrent((c) => (c + 1) % CLASSROOMS.length);
  };
  const prev = () => {
    setAutoPlay(false);
    setCurrent((c) => (c - 1 + CLASSROOMS.length) % CLASSROOMS.length);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-corporate via-corporate-dark to-corporate relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-emerald-brand/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            {lang === "ar" ? "حياتنا المدرسية" : "School Life"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            {lang === "ar" ? "أجواء تعليمية محفّزة" : "Inspiring Learning Environment"}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {lang === "ar"
              ? "نوفّر بيئة تعليمية آمنة ومحفّزة يجمع فيها طلابنا بين التعلّم والمرح تحت إشراف نخبة من الأساتذة الخليجيين المؤهلين."
              : "We provide a safe, stimulating learning environment where our students blend learning and joy under the supervision of elite qualified Gulf teachers."}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[16/10]">
            {CLASSROOMS.map((room, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={room.src}
                  alt={lang === "ar" ? room.titleAr : room.titleEn}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Title */}
                <div className="absolute bottom-6 inset-x-6 text-white">
                  <div className={`inline-block bg-gradient-to-r ${room.color} text-white text-xs font-bold px-3 py-1 rounded-full mb-2`}>
                    {lang === "ar" ? room.titleAr : room.titleEn}
                  </div>
                  <p className="text-sm text-white/80">
                    {lang === "ar"
                      ? "تفاعل حقيقي بين المعلم والطلاب في أجواء تعليمية محفّزة"
                      : "Real interaction between teacher and students in a stimulating learning atmosphere"}
                  </p>
                </div>
              </div>
            ))}

            {/* Navigation arrows */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute top-1/2 -translate-y-1/2 start-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white flex items-center justify-center transition-all hover:scale-110"
            >
              {lang === "ar" ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute top-1/2 -translate-y-1/2 end-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white flex items-center justify-center transition-all hover:scale-110"
            >
              {lang === "ar" ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-3 mt-6">
            {CLASSROOMS.map((room, i) => (
              <button
                key={i}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrent(i);
                }}
                className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  i === current
                    ? "border-gold scale-105 ring-2 ring-gold/30"
                    : "border-white/20 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={room.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-4">
            {CLASSROOMS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrent(i);
                }}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "bg-gold w-10" : "bg-white/30 w-2 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
