"use client";

import { useState } from "react";
import { useI18n } from "./i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Loader2, MessageSquare, Clock, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const { t, lang } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submit (no backend endpoint for this form)
    setTimeout(() => {
      setLoading(false);
      toast.success(lang === "ar" ? "تم إرسال رسالتك بنجاح! سنرد عليك قريباً." : "Message sent! We'll reply soon.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-corporate/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MessageSquare size={16} />
            {lang === "ar" ? "تواصل معنا" : "Contact Us"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-corporate mb-3">
            {lang === "ar" ? "نحن هنا للإجابة على استفساراتك" : "We're Here to Answer Your Questions"}
          </h2>
          <p className="text-corporate/70 text-lg max-w-2xl mx-auto">
            {lang === "ar"
              ? "لا تتردد في التواصل معنا لأي استفسار حول القبول أو المناهج أو زيارة المدرسة."
              : "Don't hesitate to reach out with any questions about admissions, curriculum, or school visits."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact form */}
          <div className="bg-white rounded-2xl border border-corporate/10 shadow-corporate p-6 sm:p-8">
            <h3 className="font-bold text-corporate text-xl mb-6 flex items-center gap-2">
              <Send size={20} className="text-gold" />
              {lang === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}
            </h3>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-corporate mb-1.5 block">
                    {lang === "ar" ? "الاسم الكامل" : "Full Name"} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-12"
                    placeholder={lang === "ar" ? "مثال: أحمد العتيبي" : "e.g., Ahmed Al-Otaibi"}
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-corporate mb-1.5 block">
                    {lang === "ar" ? "رقم الجوال" : "Phone"}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="h-12"
                    placeholder="+966 5X XXX XXXX"
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-corporate mb-1.5 block">
                  {lang === "ar" ? "البريد الإلكتروني" : "Email"} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-12"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-corporate mb-1.5 block">
                  {lang === "ar" ? "الموضوع" : "Subject"} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="h-12"
                  placeholder={lang === "ar" ? "موضوع الرسالة" : "Message subject"}
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-medium text-corporate mb-1.5 block">
                  {lang === "ar" ? "الرسالة" : "Message"} <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  placeholder={lang === "ar" ? "اكتب رسالتك هنا..." : "Write your message here..."}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-corporate hover:bg-corporate-dark text-white flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                {loading
                  ? (lang === "ar" ? "جاري الإرسال..." : "Sending...")
                  : (lang === "ar" ? "إرسال الرسالة" : "Send Message")}
              </Button>
            </form>
          </div>

          {/* Contact info + Map */}
          <div className="space-y-6">
            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="mailto:n7walmostqbl@gmail.com"
                className="bg-white rounded-2xl border border-corporate/10 shadow-sm p-5 hover:shadow-corporate transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-corporate to-corporate-light flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                  <Mail size={22} />
                </div>
                <p className="text-xs text-corporate/60 mb-1">{t("footer.email")}</p>
                <p className="font-bold text-sm text-corporate break-all" dir="ltr">n7walmostqbl@gmail.com</p>
              </a>

              <a
                href="https://wa.me/966575015019"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-corporate/10 shadow-sm p-5 hover:shadow-corporate transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-brand to-emerald-600 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                  <Phone size={22} />
                </div>
                <p className="text-xs text-corporate/60 mb-1">{lang === "ar" ? "اتصل بنا" : "Call Us"}</p>
                <p className="font-bold text-sm text-corporate" dir="ltr">+966 57 501 5019</p>
              </a>
            </div>

            {/* Working hours */}
            <div className="bg-gradient-to-br from-corporate to-corporate-dark text-white rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
                  <Clock size={20} />
                </div>
                <h3 className="font-bold text-lg">
                  {lang === "ar" ? "ساعات العمل" : "Working Hours"}
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70">{lang === "ar" ? "الأحد - الخميس" : "Sun - Thu"}</span>
                  <span className="font-mono text-gold">7:00 - 16:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70">{lang === "ar" ? "الجمعة" : "Friday"}</span>
                  <span className="text-red-400 text-xs">{lang === "ar" ? "مغلق" : "Closed"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/70">{lang === "ar" ? "السبت" : "Saturday"}</span>
                  <span className="font-mono text-gold">9:00 - 13:00</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl border border-corporate/10 shadow-corporate overflow-hidden">
              <div className="p-5 border-b border-corporate/10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-brand to-corporate flex items-center justify-center text-white shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-corporate text-sm mb-1">
                    {lang === "ar" ? "موقعنا الجغرافي" : "Our Location"}
                  </h3>
                  <p className="text-xs text-corporate/70 mb-2">
                    {lang === "ar" ? "نحو المستقبل — مكة المكرمة، المملكة العربية السعودية" : "Future-Oriented — Makkah, Saudi Arabia"}
                  </p>
                  <a
                    href="https://www.google.com/maps/place/%D9%86%D8%AD%D9%88+%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%82%D8%A8%D9%84%E2%80%AD/@21.4799237,39.8355029,16.25z/data=!4m6!3m5!1s0x15c2033c5bbaba05:0x2bd2112142484629!8m2!3d21.4794847!4d39.8373745!16s%2Fg%2F11vjhvk5t2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-corporate hover:text-gold transition-colors font-medium"
                  >
                    <ExternalLink size={12} />
                    {lang === "ar" ? "افتح في خرائط Google" : "Open in Google Maps"}
                  </a>
                </div>
              </div>
              <div className="aspect-video w-full bg-corporate/5">
                <iframe
                  src="https://maps.google.com/maps?q=21.4794847,39.8373745&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={lang === "ar" ? "موقع مدرسة نحو المستقبل - مكة المكرمة" : "Future-Oriented School Location - Makkah"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
