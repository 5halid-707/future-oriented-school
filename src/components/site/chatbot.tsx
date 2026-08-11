"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n } from "./i18n";
import { Send, Sparkles, FileText, Search, Phone, Calendar, HelpCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "bot" | "user";
  text: string;
  options?: { label: string; value: string; icon?: any }[];
}

export default function Chatbot({ onNavigate }: { onNavigate: (v: "home" | "apply" | "track") => void }) {
  const { t, lang } = useI18n();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: lang === "ar"
        ? "مرحباً بك في روضة نحو المستقبل! 👋 كيف أقدر أخدمك اليوم؟"
        : "Welcome to Future-Oriented Kindergarten! 👋 How can I help you today?",
      options: [
        { label: lang === "ar" ? "📝 التسجيل" : "📝 Registration", value: "register", icon: FileText },
        { label: lang === "ar" ? "🔍 متابعة الطلب" : "🔍 Track Application", value: "track", icon: Search },
        { label: lang === "ar" ? "📞 التواصل" : "📞 Contact", value: "contact", icon: Phone },
        { label: lang === "ar" ? "📅 مواعيد العمل" : "📅 Working Hours", value: "hours", icon: Calendar },
        { label: lang === "ar" ? "❓ أسئلة شائعة" : "❓ FAQ", value: "faq", icon: HelpCircle },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOption = (value: string) => {
    const labels: Record<string, string> = {
      register: lang === "ar" ? "📝 التسجيل" : "📝 Registration",
      track: lang === "ar" ? "🔍 متابعة الطلب" : "🔍 Track Application",
      contact: lang === "ar" ? "📞 التواصل" : "📞 Contact",
      hours: lang === "ar" ? "📅 مواعيد العمل" : "📅 Working Hours",
      faq: lang === "ar" ? "❓ أسئلة شائعة" : "❓ FAQ",
    };

    setMessages((m) => [...m, { role: "user", text: labels[value] || value }]);

    setTimeout(() => {
      let response: Message;
      switch (value) {
        case "register":
          response = {
            role: "bot",
            text: lang === "ar"
              ? "رائع! يمكنك تسجيل طفلك بسهولة عبر استمارتنا الإلكترونية الذكية. ستأخذك خطوات بسيطة لتعبئة بيانات الطالب ورفع المستندات. هل تريد البدء الآن؟"
              : "Great! You can register your child easily through our smart online form. It takes a few simple steps to fill in student data and upload documents. Want to start now?",
            options: [
              { label: lang === "ar" ? "✅ نعم، سجّل الآن" : "✅ Yes, apply now", value: "go_apply", icon: FileText },
              { label: lang === "ar" ? "🔙 رجوع" : "🔙 Back", value: "back", icon: ArrowLeft },
            ],
          };
          break;
        case "track":
          response = {
            role: "bot",
            text: lang === "ar"
              ? "يمكنك متابعة حالة طلبك برقم الطلب أو رقم جوالك. سنعرض لك المراحل: قيد المراجعة → مقبول → موعد المقابلة → تم المباشرة."
              : "You can track your application using your application ID or phone number. We'll show you all stages: Under Review → Accepted → Interview → Enrolled.",
            options: [
              { label: lang === "ar" ? "🔍 متابعة طلبي" : "🔍 Track my app", value: "go_track", icon: Search },
              { label: lang === "ar" ? "🔙 رجوع" : "🔙 Back", value: "back", icon: ArrowLeft },
            ],
          };
          break;
        case "contact":
          response = {
            role: "bot",
            text: lang === "ar"
              ? "يسعدنا تواصلك معنا! 📞\n\n📱 واتساب: +966 53 209 3435\n📧 البريد: n7walmostqbl@gmail.com\n📍 الموقع: مكة المكرمة\n\nأو استخدم نموذج التواصل في الصفحة الرئيسية."
              : "We'd love to hear from you! 📞\n\n📱 WhatsApp: +966 53 209 3435\n📧 Email: n7walmostqbl@gmail.com\n📍 Location: Makkah\n\nOr use the contact form on the home page.",
            options: [
              { label: lang === "ar" ? "💬 واتساب" : "💬 WhatsApp", value: "whatsapp", icon: Phone },
              { label: lang === "ar" ? "🔙 رجوع" : "🔙 Back", value: "back", icon: ArrowLeft },
            ],
          };
          break;
        case "hours":
          response = {
            role: "bot",
            text: lang === "ar"
              ? "مواعيد العمل 📅\n\nالأحد - الخميس: 7:00 صباحاً - 4:00 عصراً\nالجمعة: مغلق\nالسبت: 9:00 صباحاً - 1:00 ظهراً"
              : "Working Hours 📅\n\nSunday - Thursday: 7:00 AM - 4:00 PM\nFriday: Closed\nSaturday: 9:00 AM - 1:00 PM",
            options: [
              { label: lang === "ar" ? "🔙 رجوع" : "🔙 Back", value: "back", icon: ArrowLeft },
            ],
          };
          break;
        case "faq":
          response = {
            role: "bot",
            text: lang === "ar"
              ? "الأسئلة الشائعة ❓\n\n1️⃣ ما هي أعمار القبول؟ من 3-6 سنوات (تمهيدي، KG1، KG2، KG3)\n2️⃣ ما هي المستندات المطلوبة؟ شهادة الميلاد + الهوية + التقرير الطبي\n3️⃣ كم يستغرق الرد على الطلب؟ عادةً 2-3 أيام عمل\n4️⃣ هل توجد مقابلة شخصية؟ نعم، للطالب وولي الأمر"
              : "FAQ ❓\n\n1️⃣ What are the admission ages? 3-6 years (Pre-K, KG1, KG2, KG3)\n2️⃣ What documents are required? Birth certificate + ID + Medical report\n3️⃣ How long does the response take? Usually 2-3 business days\n4️⃣ Is there an interview? Yes, for the student and parent",
            options: [
              { label: lang === "ar" ? "📝 سجّل الآن" : "📝 Apply now", value: "go_apply", icon: FileText },
              { label: lang === "ar" ? "🔙 رجوع" : "🔙 Back", value: "back", icon: ArrowLeft },
            ],
          };
          break;
        case "go_apply":
          onNavigate("apply");
          return;
        case "go_track":
          onNavigate("track");
          return;
        case "whatsapp":
          window.open("https://wa.me/966532093435", "_blank");
          return;
        case "back":
          response = {
            role: "bot",
            text: lang === "ar" ? "بكل سرور! كيف أقدر أخدمك؟" : "Happy to help! How can I serve you?",
            options: [
              { label: lang === "ar" ? "📝 التسجيل" : "📝 Registration", value: "register", icon: FileText },
              { label: lang === "ar" ? "🔍 متابعة الطلب" : "🔍 Track Application", value: "track", icon: Search },
              { label: lang === "ar" ? "📞 التواصل" : "📞 Contact", value: "contact", icon: Phone },
              { label: lang === "ar" ? "📅 مواعيد العمل" : "📅 Working Hours", value: "hours", icon: Calendar },
              { label: lang === "ar" ? "❓ أسئلة شائعة" : "❓ FAQ", value: "faq", icon: HelpCircle },
            ],
          };
          break;
        default:
          response = {
            role: "bot",
            text: lang === "ar" ? "عذراً، لم أفهم. اختر من الخيارات أدناه:" : "Sorry, I didn't understand. Choose from the options below:",
            options: [
              { label: lang === "ar" ? "📝 التسجيل" : "📝 Registration", value: "register", icon: FileText },
              { label: lang === "ar" ? "📞 التواصل" : "📞 Contact", value: "contact", icon: Phone },
            ],
          };
      }
      setMessages((m) => [...m, response]);
    }, 500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setInput("");

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let response: Message;
      if (lower.includes("تسج") || lower.includes("register") || lower.includes("تسجيل")) {
        response = {
          role: "bot",
          text: lang === "ar"
            ? "يمكنك التسجيل الآن! اضغط زر التسجيل في الأعلى أو استخدم استمارة التسجيل."
            : "You can register now! Click the Apply button above or use the registration form.",
          options: [
            { label: lang === "ar" ? "📝 سجّل الآن" : "📝 Apply now", value: "go_apply", icon: FileText },
          ],
        };
      } else if (lower.includes("واتس") || lower.includes("whatsapp") || lower.includes("رقم") || lower.includes("phone")) {
        response = {
          role: "bot",
          text: lang === "ar"
            ? "رقمنا: +966 53 209 3435 📱 يمكنك التواصل عبر واتساب:"
            : "Our number: +966 53 209 3435 📱 Contact via WhatsApp:",
          options: [
            { label: "💬 WhatsApp", value: "whatsapp", icon: Phone },
          ],
        };
      } else {
        response = {
          role: "bot",
          text: lang === "ar"
            ? "شكراً لتواصلك! اختر من الخيارات أدناه لأقدر أخدمك بشكل أفضل:"
            : "Thank you for reaching out! Choose from the options below so I can serve you better:",
          options: [
            { label: lang === "ar" ? "📝 التسجيل" : "📝 Registration", value: "register", icon: FileText },
            { label: lang === "ar" ? "🔍 متابعة الطلب" : "🔍 Track Application", value: "track", icon: Search },
            { label: lang === "ar" ? "📞 التواصل" : "📞 Contact", value: "contact", icon: Phone },
          ],
        };
      }
      setMessages((m) => [...m, response]);
    }, 500);
  };

  return (
    <section className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-kid-blue via-kid-purple to-kid-pink relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-32 right-10 w-72 h-72 rounded-full bg-kid-yellow/20 blur-3xl animate-float" />
      <div className="absolute bottom-32 left-10 w-96 h-96 rounded-full bg-kid-pink/20 blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
            <Sparkles size={16} className="text-kid-yellow" />
            {lang === "ar" ? "المساعد الذكي" : "Smart Assistant"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
            {lang === "ar" ? "كيف أقدر أخدمك؟" : "How Can I Help You?"}
          </h1>
          <p className="text-white/80 text-sm">
            {lang === "ar" ? "اختر من الخيارات أو اكتب سؤالك" : "Choose from options or type your question"}
          </p>
        </div>

        {/* Chat container */}
        <div className="bg-white rounded-3xl shadow-3d-pop border-4 border-white/20 overflow-hidden">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-corporate to-corporate-dark p-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-kid-yellow">
                <img src="/school-logo.jpeg" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-brand border-2 border-white"></span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">{t("brand.name")}</p>
              <p className="text-white/60 text-xs">{lang === "ar" ? "● متصل الآن" : "● Online now"}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 sm:p-6 h-[400px] sm:h-[500px] overflow-y-auto custom-scrollbar bg-gradient-to-b from-white to-kid-soft">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-4 ${msg.role === "user" ? "text-end" : "text-start"}`}>
                <div
                  className={`inline-block max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-kid-blue to-kid-purple text-white rounded-ee-sm"
                      : "bg-white text-corporate rounded-es-sm border border-corporate/10"
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {msg.text}
                </div>

                {/* Options */}
                {msg.options && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.options.map((opt, j) => (
                      <button
                        key={j}
                        onClick={() => handleOption(opt.value)}
                        className="inline-flex items-center gap-1.5 bg-white border-2 border-kid-blue/30 hover:border-kid-blue hover:bg-kid-blue/5 text-corporate text-xs font-medium px-3 py-2 rounded-xl transition-all hover:scale-105 shadow-sm"
                      >
                        {opt.icon && <opt.icon size={14} className="text-kid-blue" />}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-corporate/10 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={lang === "ar" ? "اكتب رسالتك..." : "Type your message..."}
                className="flex-1 px-4 py-2.5 rounded-xl border border-corporate/15 text-sm text-corporate focus:outline-none focus:border-kid-blue focus:ring-2 focus:ring-kid-blue/20"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-kid-blue to-kid-purple text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                aria-label="Send"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate("home")}
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl transition-colors"
          >
            <ArrowIcon size={16} className="rotate-180" />
            {lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </button>
        </div>
      </div>
    </section>
  );
}
