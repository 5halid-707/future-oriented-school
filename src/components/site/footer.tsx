"use client";

import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { useI18n } from "./i18n";

export default function Footer({ onNavigate }: { onNavigate: (v: "home" | "apply" | "track") => void }) {
  const { t, lang } = useI18n();

  return (
    <footer className="bg-corporate text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-gold/30">
                <img src="/school-logo.jpeg" alt={t("brand.name")} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-base">{t("brand.short")}</p>
                <p className="text-xs text-white/60">{t("brand.tagline")}</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {t("footer.about")}
            </p>
          </div>

          {/* Quick links */}
          <div className="md:text-center">
            <h4 className="font-bold text-gold mb-4 text-sm uppercase tracking-wider">
              {t("footer.quicklinks")}
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "home", label: t("nav.home") },
                { href: "about", label: t("nav.about") },
                { href: "features", label: t("nav.features") },
                { href: "apply", label: t("nav.admission") },
                { href: "track", label: t("nav.track") },
              ].map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => {
                      if (l.href === "apply" || l.href === "track" || l.href === "home") {
                        onNavigate(l.href as any);
                      } else {
                        document.getElementById(l.href)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-white/70 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="font-bold text-gold mb-4 text-sm uppercase tracking-wider">
              {t("footer.contact")}
            </h4>
            <div className="space-y-2.5 text-sm mb-5">
              <a href="mailto:n7walmostqbl@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors">
                <Mail size={16} className="text-gold shrink-0" />
                <span dir="ltr">n7walmostqbl@gmail.com</span>
              </a>
              <p className="flex items-center gap-2 text-white/70">
                <MapPin size={16} className="text-gold shrink-0" />
                <span>{t("footer.rights").split(".")[0].replace("© 2026 ", "")}</span>
              </p>
            </div>

            <p className="text-xs text-white/50 mb-2">{t("footer.follow")}</p>
            <div className="flex items-center gap-3">
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@n7w_almostqbl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/n7walmostqbl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.39A5.88 5.88 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.73 1.48 1.39 2.13a5.88 5.88 0 0 0 2.13 1.39c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.39 5.88 5.88 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.39-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
                </svg>
              </a>
              {/* Snapchat */}
              <a
                href="https://www.snapchat.com/@n7w-almostqbl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Snapchat"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M12.16 2c2.56 0 4.32 1.67 4.51 4.2.07.96-.05 1.97-.06 2.95.27.15.6.18.92.18.36 0 .74-.12 1.12-.12.34 0 .69.13.83.5.18.47-.18.78-.66.91-.5.14-1.06.13-1.55.36-.55.26-.43.85-.05 1.27.62.7 1.5 1.18 2.45 1.43.32.08.65.16.65.55 0 .58-.97.81-1.4.94-.26.08-.4.14-.46.42-.06.27-.08.62-.42.7-.4.1-.92-.12-1.45-.12-.5 0-.93.13-1.36.5-.7.6-1.42 1.36-2.5 1.36s-1.8-.76-2.5-1.36c-.43-.37-.86-.5-1.36-.5-.53 0-1.05.22-1.45.12-.34-.08-.36-.43-.42-.7-.06-.28-.2-.34-.46-.42-.43-.13-1.4-.36-1.4-.94 0-.39.33-.47.65-.55.95-.25 1.83-.73 2.45-1.43.38-.42.5-1.01-.05-1.27-.49-.23-1.05-.22-1.55-.36-.48-.13-.84-.44-.66-.91.14-.37.49-.5.83-.5.38 0 .76.12 1.12.12.32 0 .65-.03.92-.18-.01-.98-.13-1.99-.06-2.95C7.84 3.67 9.6 2 12.16 2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 text-center space-y-2">
          <p className="text-xs text-white/50">{t("footer.rights")}</p>
          <p className="text-xs text-white/40 flex items-center justify-center gap-1.5 flex-wrap">
            <span>{lang === "ar" ? "صُمّم بكل" : "Designed with"}</span>
            <span className="text-red-400 inline-flex animate-pulse" style={{ animationDuration: "2s" }} aria-hidden>❤</span>
            <span>{lang === "ar" ? "حب بواسطة" : "by"}</span>
            <a
              href="https://khalid-cyber-security.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gold hover:text-white transition-colors underline decoration-gold/30 hover:decoration-white underline-offset-2"
            >
              خالد محمد
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
