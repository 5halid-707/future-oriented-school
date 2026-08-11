"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe, ShieldCheck } from "lucide-react";
import { useI18n } from "./i18n";

interface NavbarProps {
  onNavigate: (view: "home" | "apply" | "track") => void;
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
    if (href === "apply" || href === "track" || href === "home") {
      onNavigate(href as any);
    } else {
      // scroll to section
      const el = document.getElementById(href);
      el?.scrollIntoView({ behavior: "smooth" });
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
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden ring-2 ring-gold/30 group-hover:ring-gold transition-all group-hover:scale-105">
            <img
              src="/school-logo.jpeg"
              alt={t("brand.name")}
              className="w-full h-full object-cover"
            />
          </div>
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
