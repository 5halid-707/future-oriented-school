"use client";

import { useState, useEffect } from "react";
import { useI18n } from "./i18n";
import { ChevronLeft, ChevronRight, Sparkles, Quote } from "lucide-react";

// Real photos from Unsplash (free for commercial use, no copyright)
const CLASSROOMS = [
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80&auto=format&fit=crop",
    titleAr: "فصول تفاعلية حديثة",
    titleEn: "Modern Interactive Classrooms",
    descAr: "فصول دراسية مجهّزة بأحدث الوسائل التعليمية لتحفيز الإبداع والتعلّم الذاتي.",
    descEn: "Modern classrooms equipped with the latest educational tools to stimulate creativity and self-learning.",
    color: "from-kid-orange to-kid-red",
    tag: "📚",
  },
  {
    src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=80&auto=format&fit=crop",
    titleAr: "تعلّم ممتع",
    titleEn: "Joyful Learning",
    descAr: "نُحوّل التعلّم إلى مغامرة ممتعة حيث يكتشف أطفالنا المعرفة بشغف وفضول.",
    descEn: "We turn learning into a joyful adventure where children discover knowledge with passion and curiosity.",
    color: "from-kid-green to-emerald-brand",
    tag: "🌱",
  },
  {
    src: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=1200&q=80&auto=format&fit=crop",
    titleAr: "رعاية متخصصة",
    titleEn: "Personalized Care",
    descAr: "نولي كل طفل اهتماماً فردياً يراعي احتياجاته وميوله وقدراته الخاصة.",
    descEn: "We give each child individual attention tailored to their needs, interests, and unique abilities.",
    color: "from-kid-blue to-kid-cyan",
    tag: "💝",
  },
  {
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80&auto=format&fit=crop",
    titleAr: "إبداع وفنون",
    titleEn: "Creativity & Arts",
    descAr: "نشجّع الإبداع عبر الفنون والموسيقى والأنشطة العملية التي تُطلق خيال أطفالنا.",
    descEn: "We encourage creativity through arts, music, and hands-on activities that unleash our children's imagination.",
    color: "from-kid-purple to-kid-pink",
    tag: "🎨",
  },
  {
    src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&q=80&auto=format&fit=crop",
    titleAr: "أنشطة جماعية",
    titleEn: "Group Activities",
    descAr: "نُعزّز روح العمل الجماعي والتعاون بين الطلاب من خلال أنشطة تفاعلية ممتعة.",
    descEn: "We foster teamwork and cooperation through fun interactive group activities.",
    color: "from-kid-yellow to-kid-orange",
    tag: "🤝",
  },
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
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-kid-yellow/15 blur-3xl animate-float" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-kid-pink/15 blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      {/* Floating decorative shapes */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-kid-yellow rounded-full opacity-60 animate-float" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-kid-orange rounded-full opacity-60 animate-float" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-kid-green rounded-full opacity-50 animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-kid-yellow px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            {lang === "ar" ? "حياتنا في الروضة" : "Kindergarten Life"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
            {lang === "ar" ? "أجواء تعليمية محفّزة" : "Inspiring Learning Environment"}
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {lang === "ar"
              ? "نوفّر بيئة تعليمية آمنة ومحفّزة يجمع فيها طلابنا بين التعلّم والمرح تحت إشراف نخبة من الأساتذة المؤهلين."
              : "We provide a safe, stimulating learning environment where our students blend learning and joy under the supervision of elite qualified teachers."}
          </p>
        </div>

        {/* Carousel with 3D perspective */}
        <div className="relative max-w-5xl mx-auto perspective-2000">
          {/* Main image card */}
          <div className="relative rounded-3xl overflow-hidden shadow-3d-pop border-4 border-white/20 aspect-[16/10] preserve-3d card-3d">
            {CLASSROOMS.map((room, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-700 ${
                  i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              >
                <img
                  src={room.src}
                  alt={lang === "ar" ? room.titleAr : room.titleEn}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                {/* Floating emoji tag */}
                <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg">
                  {room.tag}
                </div>
                {/* Title and description */}
                <div className="absolute bottom-6 inset-x-6 text-white">
                  <div className={`inline-block bg-gradient-to-r ${room.color} text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-lg`}>
                    {lang === "ar" ? room.titleAr : room.titleEn}
                  </div>
                  <p className="text-sm sm:text-base text-white/90 max-w-2xl drop-shadow">
                    {lang === "ar" ? room.descAr : room.descEn}
                  </p>
                </div>
              </div>
            ))}

            {/* Navigation arrows */}
            <button
              onClick={prev}
              aria-label={lang === "ar" ? "السابق" : "Previous"}
              className="absolute top-1/2 -translate-y-1/2 start-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white flex items-center justify-center transition-all hover:scale-110 shadow-3d-pop"
            >
              {lang === "ar" ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
            <button
              onClick={next}
              aria-label={lang === "ar" ? "التالي" : "Next"}
              className="absolute top-1/2 -translate-y-1/2 end-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white flex items-center justify-center transition-all hover:scale-110 shadow-3d-pop"
            >
              {lang === "ar" ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
          </div>

          {/* Thumbnails with 3D hover effect */}
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {CLASSROOMS.map((room, i) => (
              <button
                key={i}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrent(i);
                }}
                aria-label={`Slide ${i + 1}`}
                className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all card-3d-lift ${
                  i === current
                    ? "border-kid-yellow scale-110 ring-2 ring-kid-yellow/40 shadow-3d-pop"
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
                  i === current ? "bg-kid-yellow w-10" : "bg-white/30 w-2 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial card */}
        <div className="mt-12 max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-3d-pop">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-kid-yellow flex items-center justify-center text-corporate shrink-0">
              <Quote size={24} />
            </div>
            <div>
              <p className="text-white/90 text-lg leading-relaxed mb-3">
                {lang === "ar"
                  ? "«رأيتُ تطوراً ملحوظاً في ابني منذ التحاقه بالروضة. أصبح أكثر ثقة بنفسه وشغفاً بالتعلّم. الأساتذة هنا لا يعلّمون فقط، بل يزرعون حب المعرفة في القلوب.»"
                  : "\"I have seen remarkable development in my son since he joined the school. He has become more confident and passionate about learning. The teachers here don't just teach — they plant the love of knowledge in hearts.\""}
              </p>
              <p className="text-kid-yellow font-bold text-sm">
                — {lang === "ar" ? "ولي أمر طالب بالصف الثاني" : "Parent of a 2nd grade student"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
