import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/components/site/i18n";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f2c5c",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://Future-Oriented-Center.vercel.app"),
  title: "روضة نحو المستقبل | Future-Oriented Kindergarten — بوابة القبول والتسجيل الإلكتروني",
  description:
    "نظام قبول وتسجيل إلكتروني متكامل لروضة نحو المستقبل. قدّم طلبك وتابع حالته لحظة بلحظة. استمارة تسجيل ذكية، رفع مستندات، متابعة الطلب، وأتمتة إدارية كاملة.",
  keywords: [
    "روضة نحو المستقبل",
    "Future-Oriented Kindergarten",
    "التسجيل الإلكتروني",
    "Online Admission",
    "بوابة القبول",
    "Admission Portal",
    "تسجيل طلاب",
    "Student Registration",
    "السعودية",
    "Saudi Arabia",
  ],
  authors: [{ name: "Future-Oriented Kindergarten" }],
  creator: "Future-Oriented Kindergarten",
  publisher: "Future-Oriented Kindergarten",
  alternates: {
    canonical: "/",
    languages: { "ar-SA": "/", "en-US": "/" },
  },
  openGraph: {
    title: "روضة نحو المستقبل | Future-Oriented Kindergarten",
    description:
      "بوابة القبول والتسجيل الإلكتروني — نظام متكامل لتسجيل الطلاب ومتابعة حالات الطلب.",
    url: "https://Future-Oriented-Center.vercel.app",
    siteName: "Future-Oriented Kindergarten",
    images: [
      {
        url: "/school-logo.jpeg",
        width: 1170,
        height: 1111,
        alt: "روضة نحو المستقبل - Future-Oriented Kindergarten",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "روضة نحو المستقبل | Future-Oriented Kindergarten",
    description: "بوابة القبول والتسجيل الإلكتروني",
    images: ["/school-logo.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/school-logo.jpeg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.svg",
    apple: "/school-logo.jpeg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "روضة نحو المستقبل",
    statusBarStyle: "black-translucent",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} antialiased bg-background text-foreground`}>
        <I18nProvider>
          {children}
          <Toaster />
          <SonnerToaster position="top-center" richColors />
        </I18nProvider>
        {/* Register PWA service worker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && 'window' in self) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('SW registered:', registration.scope);
                  }).catch(function(err) {
                    console.log('SW registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
