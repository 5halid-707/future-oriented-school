"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe, ShieldCheck, MessageCircle } from "lucide-react";
import { useI18n } from "./i18n";
import AnimatedLogo from "./animated-logo";

interface NavbarProps {
  onNavigate: (view: "home" | "apply" | "track" | "chatbot") => void;
  currentView: string;
}

export default function Navbar({ onNavigate, currentView }: NavbarProps) {
  const { t, lang, toggleLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "home", label: t("nav.home") },
    { href: "about", label: t("nav.about") },
    { href: "features", label: t("nav.features") },
    { href: "apply", label: t("nav.admission") },
    { href: "track", label: t("nav.track") },
    { href: "contact", label: t("nav.contact") },
  ] as const;

  const handleNav = (href: string) => {
    setOpen(false);
    if (href === "apply" || href === "track" || href === "home" || href === "chatbot") {
      onNavigate(href as any);
    } else {
      onNavigate("home");
      setTimeout(() => {
        document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-corporate/5"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Animated 3D Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 group"
        >
          <AnimatedLogo
            size={44}
            variant="navbar"
            className="group-hover:scale-110 transition-transform duration-300"
          />
          <div className="flex flex-col leading-tight text-right">
            <span className="font-bold text-sm sm:text-base text-corporate">
              {t("brand.short")}
            </span>
            <span className="text-[10px] sm:text-xs text-corporate/60">
              {t("brand.tagline")}
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === l.href
                    ? "text-gold bg-gold/10"
                    : "text-corporate/80 hover:text-corporate hover:bg-corporate/5"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
          {/* How can I serve you - chatbot button */}
          <li>
            <button
              onClick={() => handleNav("chatbot")}
              className="ms-2 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-kid-orange to-kid-red text-white shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <MessageCircle size={16} />
              {lang === "ar" ? "كيف أقدر أخدمك؟" : "How can I help?"}
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-corporate hover:bg-corporate/5 transition-colors"
            aria-label="Toggle language"
          >
            <Globe size={16} />
            <span>{lang === "ar" ? "EN" : "ع"}</span>
          </button>

          {/* Admin login */}
          <a
            href="/admin/login"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-corporate text-white text-sm font-semibold hover:bg-corporate-dark transition-colors"
          >
            <ShieldCheck size={16} />
            {t("nav.admin")}
          </a>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-corporate"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-corporate/10 shadow-lg">
          <ul className="flex flex-col px-4 py-3 gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNav(l.href)}
                  className={`w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentView === l.href
                      ? "text-gold bg-gold/10"
                      : "text-corporate/80 hover:bg-corporate/5"
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleNav("chatbot")}
                className="w-full flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-bold bg-gradient-to-r from-kid-orange to-kid-red text-white"
              >
                <MessageCircle size={16} />
                {lang === "ar" ? "كيف أقدر أخدمك؟" : "How can I help?"}
              </button>
            </li>
            <li>
              <a
                href="/admin/login"
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold bg-corporate text-white"
              >
                <ShieldCheck size={16} />
                {t("nav.admin")}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
