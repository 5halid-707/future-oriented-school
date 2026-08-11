"use client";

import { useState } from "react";
import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import About from "@/components/site/about";
import Features from "@/components/site/features";
import AdmissionForm from "@/components/site/admission-form";
import TrackApplication from "@/components/site/track-application";
import SuccessScreen from "@/components/site/success-screen";
import Footer from "@/components/site/footer";

type View = "home" | "apply" | "track" | "success";

export default function HomePage() {
  const [view, setView] = useState<View>("home");
  const [applicationId, setApplicationId] = useState("");

  const handleApply = () => {
    setView("apply");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTrack = () => {
    setView("track");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHome = () => {
    setView("home");
    window.scrollTo({ Top: 0, behavior: "smooth" });
  };

  const handleSuccess = (id: string) => {
    setApplicationId(id);
    setView("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        onNavigate={(v) => {
          if (v === "apply") handleApply();
          else if (v === "track") handleTrack();
          else handleHome();
        }}
        currentView={view === "success" ? "apply" : view}
      />

      <main className="flex-1">
        {view === "home" && (
          <>
            <Hero onApply={handleApply} onTrack={handleTrack} />
            <About />
            <Features />
            <ApplyCTA onApply={handleApply} />
          </>
        )}

        {view === "apply" && (
          <AdmissionForm onSuccess={handleSuccess} />
        )}

        {view === "track" && (
          <TrackApplication onApplyNew={handleApply} />
        )}

        {view === "success" && (
          <SuccessScreen
            applicationId={applicationId}
            onTrack={handleTrack}
            onNew={handleApply}
          />
        )}
      </main>

      <Footer
        onNavigate={(v) => {
          if (v === "apply") handleApply();
          else if (v === "track") handleTrack();
          else handleHome();
        }}
      />
    </div>
  );
}

function ApplyCTA({ onApply }: { onApply: () => void }) {
  return (
    <section className="py-20 bg-gradient-to-br from-corporate via-corporate-dark to-corporate text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          جاهز لبدء رحلة طفلك التعليمية؟
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          انضم إلى عائلة مدرسة نحو المستقبل اليوم. عملية التسجيل بسيطة وسريعة بالكامل عبر الإنترنت.
        </p>
        <button
          onClick={onApply}
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-bold px-8 py-4 rounded-xl shadow-gold transition-all hover:scale-105"
        >
          ابدأ التسجيل الآن
        </button>
      </div>
    </section>
  );
}
