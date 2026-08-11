"use client";

import { useState } from "react";
import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import About from "@/components/site/about";
import Features from "@/components/site/features";
import ClassroomGallery from "@/components/site/classroom-gallery";
import Contact from "@/components/site/contact";
import AdmissionForm from "@/components/site/admission-form";
import TrackApplication from "@/components/site/track-application";
import SuccessScreen from "@/components/site/success-screen";
import Footer from "@/components/site/footer";
import WhatsAppButton from "@/components/site/whatsapp-button";
import Chatbot from "@/components/site/chatbot";

type View = "home" | "apply" | "track" | "success" | "chatbot";

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChatbot = () => {
    setView("chatbot");
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          else if (v === "chatbot") handleChatbot();
          else if (v === "home") handleHome();
          else {
            // For section-based links (about, features, contact), go home then scroll
            if (view !== "home") {
              setView("home");
              setTimeout(() => {
                document.getElementById(v)?.scrollIntoView({ behavior: "smooth" });
              }, 200);
            } else {
              document.getElementById(v)?.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
        currentView={view === "success" ? "apply" : view}
      />

      <main className="flex-1">
        {view === "home" && (
          <>
            <Hero onApply={handleApply} onTrack={handleTrack} />
            <About />
            <ClassroomGallery />
            <Features />
            <Contact />
            <ApplyCTA onApply={handleApply} />
          </>
        )}

        {view === "apply" && (
          <AdmissionForm onSuccess={handleSuccess} />
        )}

        {view === "track" && (
          <TrackApplication onApplyNew={handleApply} />
        )}

        {view === "chatbot" && (
          <Chatbot
            onNavigate={(v) => {
              if (v === "apply") handleApply();
              else if (v === "track") handleTrack();
              else handleHome();
            }}
          />
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
          else if (v === "home") handleHome();
          else {
            if (view !== "home") {
              setView("home");
              setTimeout(() => {
                document.getElementById(v)?.scrollIntoView({ behavior: "smooth" });
              }, 200);
            } else {
              document.getElementById(v)?.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
      />

      {/* Floating WhatsApp button - visible on all views except chatbot */}
      {view !== "chatbot" && <WhatsAppButton phone="+966 53 209 3435" />}
    </div>
  );
}

function ApplyCTA({ onApply }: { onApply: () => void }) {
  return (
    <section className="py-20 bg-gradient-to-br from-corporate via-corporate-dark to-corporate text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-kid-yellow/15 blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-kid-pink/15 blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 drop-shadow-lg">
          جاهز لبدء رحلة طفلك التعليمية؟
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          انضم إلى عائلة روضة نحو المستقبل اليوم. عملية التسجيل بسيطة وسريعة بالكامل عبر الإنترنت.
        </p>
        <button
          onClick={onApply}
          className="inline-flex items-center gap-2 bg-kid-orange hover:bg-kid-red text-white font-bold px-8 py-4 rounded-xl shadow-3d-pop transition-all hover:scale-105"
        >
          ابدأ التسجيل الآن
        </button>
      </div>
    </section>
  );
}
