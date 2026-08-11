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
  title: "مدرسة نحو المستقبل | Future-Oriented School — بوابة القبول والتسجيل الإلكتروني",
  description:
    "نظام قبول وتسجيل إلكتروني متكامل لمدرسة نحو المستقبل. قدّم طلبك وتابع حالته لحظة بلحظة. استمارة تسجيل ذكية، رفع مستندات، متابعة الطلب، وأتمتة إدارية كاملة.",
  keywords: [
    "مدرسة نحو المستقبل",
    "Future-Oriented School",
    "التسجيل الإلكتروني",
    "Online Admission",
    "بوابة القبول",
    "Admission Portal",
    "تسجيل طلاب",
    "Student Registration",
    "السعودية",
    "Saudi Arabia",
  ],
  authors: [{ name: "Future-Oriented School" }],
  creator: "Future-Oriented School",
  publisher: "Future-Oriented School",
  alternates: {
    canonical: "/",
    languages: { "ar-SA": "/", "en-US": "/" },
  },
  openGraph: {
    title: "مدرسة نحو المستقبل | Future-Oriented School",
    description:
      "بوابة القبول والتسجيل الإلكتروني — نظام متكامل لتسجيل الطلاب ومتابعة حالات الطلب.",
    url: "https://Future-Oriented-Center.vercel.app",
    siteName: "Future-Oriented School",
    images: [
      {
        url: "/school-logo.jpeg",
        width: 1170,
        height: 1111,
        alt: "مدرسة نحو المستقبل - Future-Oriented School",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مدرسة نحو المستقبل | Future-Oriented School",
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
      </body>
    </html>
  );
}
