"use client";

import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
  variant?: "navbar" | "hero" | "footer";
}

/**
 * AnimatedLogo
 * ------------
 * Renders the kindergarten logo with a professional, modern 3D animation system:
 *  1. Rotating gold conic-gradient ring around the logo
 *  2. 3D perspective tilt (gentle rotation every 8s)
 *  3. Shine sweep beam crossing the photo every 4s
 *  4. Pulsing golden glow halo
 *  5. Subtle scale pulse (breathing effect)
 *  6. Top gloss highlight for depth
 */
export default function AnimatedLogo({
  size = 44,
  className,
  variant = "navbar",
}: AnimatedLogoProps) {
  const isHero = variant === "hero";
  const logoSize = isHero ? size : size;
  const ringPadding = Math.max(2, Math.round(logoSize * 0.08));

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center animate-logo-pulse",
        className,
      )}
      style={{ width: logoSize, height: logoSize }}
    >
      {/* Rotating gold conic ring */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full animate-logo-ring"
        style={{
          padding: ringPadding,
          background:
            "conic-gradient(from 0deg, #c9a55a, #facc15, #f97316, #c9a55a, #facc15, #c9a55a)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
        }}
      />

      {/* Pulsing golden glow halo */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full animate-logo-glow"
        style={{
          boxShadow:
            "0 0 12px #facc15, 0 0 24px rgba(250, 204, 21, 0.5), 0 0 0 0 rgba(250, 204, 21, 0.4)",
          animation: "logo-gold-breathe 3s ease-in-out infinite",
        }}
      />

      {/* Photo container with 3D tilt + clip */}
      <span
        className={cn(
          "relative overflow-hidden rounded-full animate-logo-tilt",
          "border-2 border-gold/50",
        )}
        style={{
          width: logoSize - ringPadding * 2,
          height: logoSize - ringPadding * 2,
        }}
      >
        <img
          src="/school-logo.jpeg"
          alt="روضة نحو المستقبل - Future-Oriented Kindergarten"
          className="h-full w-full object-cover"
          draggable={false}
          loading="eager"
        />

        {/* Shine sweep beam */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-logo-shine"
          style={{
            background:
              "linear-gradient(115deg, transparent 0%, transparent 35%, rgba(255,255,255,0.65) 50%, transparent 65%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Top gloss highlight for depth */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)",
          }}
        />
      </span>

      {/* Sparkle accents on hero variant */}
      {isHero && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute -top-1 -right-1 h-2 w-2 rounded-full bg-white animate-logo-sparkle"
            style={{ animationDelay: "0s" }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-1 -left-1 h-1.5 w-1.5 rounded-full bg-facc15 animate-logo-sparkle"
            style={{ animationDelay: "0.8s" }}
          />
        </>
      )}

      {/* Add the gold breathe keyframe inline since it's variant-specific */}
      <style jsx>{`
        @keyframes logo-gold-breathe {
          0%, 100% {
            box-shadow: 0 0 8px #facc15, 0 0 16px rgba(250, 204, 21, 0.4), 0 0 0 0 rgba(250, 204, 21, 0.5);
          }
          50% {
            box-shadow: 0 0 16px #facc15, 0 0 32px rgba(250, 204, 21, 0.6), 0 0 0 6px rgba(250, 204, 21, 0.15);
          }
        }
      `}</style>
    </span>
  );
}
