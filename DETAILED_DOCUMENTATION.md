# 📚 التوثيق التفصيلي الكامل — روضة نحو المستقبل

## 🎯 نظرة عامة على المشروع

تطبيق ويب احترافي متكامل لروضة **"نحو المستقبل"** — نظام قبول وتسجيل إلكتروني
عالمي المستوى. بُني بأحدث التقنيات (Next.js 16 + TypeScript + PostgreSQL + Prisma)
مع دعم كامل للغة العربية (RTL) والإنجليزية، وتصميم ثلاثي الأبعاد وألوان طفولية
جذابة.

**الرابط المباشر**: https://future-oriented-school.vercel.app/
**GitHub**: https://github.com/5halid-707/future-oriented-school

---

## 🏗️ البنية التقنية (Tech Stack)

| الطبقة | التقنية |
|--------|---------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 6 |
| Auth | bcryptjs + httpOnly cookies |
| Email | Resend |
| PWA | manifest.json + Service Worker |
| Icons | Lucide React |
| Fonts | Cairo (Arabic + Latin) |

---

## 📁 هيكل الملفات التفصيلي

```
future-oriented-school/
├── 📁 prisma/
│   └── schema.prisma              # مخطط قاعدة البيانات (PostgreSQL)
│                                    Models: User, Application, ActivityLog, Setting
│
├── 📁 public/
│   ├── school-logo.jpeg            # شعار الروضة
│   ├── kindergarten-display.jpg    # صورة العرض المرفوعة (جديدة)
│   ├── manifest.json               # PWA manifest (للتثبيت كتطبيق)
│   ├── sw.js                       # Service Worker (offline support)
│   ├── favicon.svg                 # أيقونة المتصفح المتحركة
│   ├── logo.svg                    # شعار JSON-LD
│   └── robots.txt                   # إعدادات محركات البحث
│
├── 📁 scripts/
│   └── seed.ts                     # تهيئة قاعدة البيانات (admin + 3 طلبات)
│
├── 📁 src/
│   ├── 📁 app/
│   │   ├── layout.tsx              # المخطط الرئيسي (PWA + i18n + fonts)
│   │   ├── page.tsx                # الصفحة الرئيسية (view-switching)
│   │   ├── globals.css             # النظام التصميمي (ألوان + 3D + animations)
│   │   │
│   │   ├── 📁 api/                 # API Routes
│   │   │   ├── 📁 applications/
│   │   │   │   ├── submit/route.ts # POST: استلام طلب تسجيل جديد
│   │   │   │   ├── track/route.ts  # GET: متابعة الطلب (بحث)
│   │   │   │   ├── list/route.ts   # GET: قائمة الطلبات (admin)
│   │   │   │   └── [id]/route.ts   # GET/PATCH: تفاصيل + تغيير حالة
│   │   │   │
│   │   │   └── 📁 auth/
│   │   │       ├── login/route.ts  # POST: تسجيل دخول الإدارة
│   │   │       ├── logout/route.ts # POST: تسجيل خروج
│   │   │       └── me/route.ts     # GET: التحقق من الجلسة
│   │   │
│   │   └── 📁 admin/
│   │       ├── page.tsx            # لوحة تحكم الإدارة
│   │       └── login/page.tsx      # صفحة تسجيل الدخول
│   │
│   ├── 📁 components/
│   │   ├── 📁 site/                # مكوّنات الموقع
│   │   │   ├── i18n.tsx            # نظام اللغتين (AR/EN)
│   │   │   ├── navbar.tsx          # الشريط العلوي + شعار 3D
│   │   │   ├── animated-logo.tsx   # الشعار ثلاثي الأبعاد المتحرك
│   │   │   ├── hero.tsx            # القسم الرئيسي + كاروسيل صور
│   │   │   ├── about.tsx           # قسم "من نحن" + صورة حقيقية
│   │   │   ├── features.tsx        # 6 مميزات بأيقونات صفراء
│   │   │   ├── classroom-gallery.tsx # معرض الصور المتحرك
│   │   │   ├── contact.tsx         # نموذج تواصل + خريطة Google
│   │   │   ├── admission-form.tsx  # استمارة التسجيل (6 خطوات)
│   │   │   ├── track-application.tsx # متابعة حالة الطلب
│   │   │   ├── success-screen.tsx  # شاشة النجاح
│   │   │   ├── chatbot.tsx         # "كيف أقدر أخدمك؟" مساعد ذكي
│   │   │   ├── whatsapp-button.tsx # زر واتساب عائم نابض
│   │   │   ├── scroll-arrows.tsx   # أسهم تنقل (أعلى/أسفل)
│   │   │   ├── footer.tsx          # التذييل + سوشل ميديا
│   │   │   └── (shadcn/ui components في components/ui/)
│   │   │
│   │   └── 📁 ui/                  # 47+ مكوّن shadcn/ui
│   │
│   └── 📁 lib/
│       ├── db.ts                   # Prisma Client (singleton)
│       ├── auth.ts                 # توكنات الجلسة (create/verify)
│       ├── security.ts             # الحماية الشاملة (جديد)
│       │   ├── rate limiting (in-memory per-IP)
│       │   ├── input sanitization (XSS)
│       │   ├── email/phone validation
│       │   ├── file upload validation
│       │   ├── CSRF protection
│       │   ├── security headers (CSP, HSTS, X-Frame, etc.)
│       │   ├── password strength validation
│       │   └── audit logging
│       └── utils.ts                # أدوات مساعدة (cn, etc.)
│
├── .env.example                    # متغيرات البيئة المطلوبة
├── .env                            # متغيرات البيئة المحلية (لا يُرفع)
├── next.config.ts                  # إعدادات Next.js
├── package.json                    # الـ dependencies
├── tailwind.config.ts              # إعدادات Tailwind
├── tsconfig.json                   # إعدادات TypeScript
└── README.md                       # دليل النشر
```

---

## ✨ كل المميزات بالتفصيل

### 1️⃣ واجهة الجمهور (Public Portal)

#### 🏠 الصفحة الرئيسية (Hero)
- **شعار 3D متحرك**: حلقة ذهبية دوارة + لمعان + توهج نابض
- **كاروسيل 5 صور حقيقية**: صورة الروضة + 4 صور من Unsplash
- **شارات عائمة**: "معتمد" + "جمعية ترتيل"
- **إحصائيات**: 1200+ طالب، 85+ معلم، 15+ سنة، 98% نجاح
- **خلفية متحركة**: تدرجات + أشكال عائمة (wiggling)

#### 👨‍👩‍👧‍👦 قسم "من نحن" (About)
- **صورة حقيقية** لأستاذة مع أطفال (Unsplash)
- **بطاقة 3D** مع تأثير tilt + ظلال عمق
- **3 مميزات**: منهج معتمد + كوادر متميزة + مرافق عالمية
- **أيقونات صفراء** (from-kid-yellow to-kid-orange)
- **خلفية معجونية ناعمة** (kid-soft gradient)

#### 🖼️ معرض الصور (Classroom Gallery)
- **6 صور حقيقية**: روضتنا + فصول تفاعلية + تعلّم ممتع + رعاية + إبداع + أنشطة
- **كاروسيل تلقائي** كل 4.5 ثانية
- **3D perspective** على الصورة الرئيسية
- **صور مصغّرة** قابلة للنقر مع تأثير lift
- **نقاط تقدم** للتنقل
- **شهادة عميل** (testimonial) مع أيقونة Quote

#### ⭐ المميزات (Features)
- **6 بطاقات** بأيقونات صفراء متدرجة:
  1. استمارة تسجيل ذكية
  2. رفع المستندات
  3. متابعة حالة الطلب
  4. أتمتة إدارية
  5. تنبيهات فورية
  6. دعم ثنائي اللغة
- **تأثيرات 3D**: lift + rotate على hover
- **أشرطة علوية متدرجة** الألوان

#### 📞 قسم التواصل (Contact)
- **نموذج تواصل كامل**: الاسم + الجوال + البريد + الموضوع + الرسالة
- **بطاقتي تواصل**: بريد إلكتروني + واتساب
- **ساعات العمل** (الأحد-الخميس، الجمعة، السبت)
- **خريطة Google مدمجة** (مكة المكرمة - الإحداثيات الصحيحة)
- **رابط مباشر** لفتح Google Maps

#### 📝 استمارة التسجيل (Admission Form)
- **6 خطوات**:
  1. بيانات الطالب (الاسم، الميلاد، الجنس، المستوى، الجنسية)
  2. ولي الأمر (الاسم، صلة القرابة، المهنة)
  3. بيانات التواصل (الجوال، البريد، المدينة، الحي)
  4. السجل الطبي (تاريخ طبي، حساسية، فصيلة دم، طوارئ)
  5. المستندات (شهادة ميلاد + هوية + تقرير طبي)
  6. مراجعة + إرسال
- **شريط تقدم تفاعلي** مع علامات نجاح
- **رفع ملفات drag-and-drop** مع معاينة فورية
- **تحقق فوري** من الحقول المطلوبة
- **مستويات الروضة**: تمهيدي، KG1، KG2، KG3

#### 🔍 متابعة الطلب (Track Application)
- بحث برقم الطلب أو رقم الجوال
- **شريط تقدم بصري** للمراحل الأربع:
  - قيد المراجعة → مقبول → موعد المقابلة → تم المباشرة
- **سجل نشاط كامل** بكل التحديثات

#### 🤖 "كيف أقدر أخدمك؟" (Chatbot)
- واجهة دردشة احترافية مع ردود سريعة
- **5 خيارات**: تسجيل، متابعة، تواصل، مواعيد، أسئلة شائعة
- **كشف ذكي للكلمات المفتاحية**
- تنقل مباشر للصفحات
- رابط واتساب من الشات

### 2️⃣ لوحة تحكم الإدارة (Admin Dashboard)

#### 🔐 تسجيل الدخول
- **البريد**: `n7walmostqbl@gmail.com`
- **كلمة المرور**: `Admin@2026`
- **حماية**: bcrypt + httpOnly cookies + rate limiting

#### 📊 لوحة التحكم
- **5 بطاقات إحصائية**:
  - إجمالي الطلبات
  - قيد المراجعة
  - مقبولة
  - مقابلات مجدولة
  - تم المباشرة
- **جدول الطلبات** مع:
  - بحث (رقم الطلب أو الاسم)
  - فلترة (المستوى + الحالة)
  - ترقيم صفحات
- **Modal تفاصيل الطلب**:
  - بيانات الطالب + ولي الأمر + التواصل + الطبي
  - المستندات القابلة للتحميل
  - تغيير الحالة + جدولة مقابلة + ملاحظات
  - **أتمتة**: تحويل تلقائي لملف طالب عند "تم المباشرة"
  - سجل نشاط كامل

### 3️⃣ الأمان والحماية (Security)

#### 🛡️ الحماية من الثغرات الشهيرة

| الثغرة | الحماية |
|--------|---------|
| **SQL Injection** | Prisma ORM (parameterized queries افتراضياً) |
| **XSS** | sanitizeString (إزالة `<>`, `javascript:`, event handlers) |
| **CSRF** | توكنات CSRF (constant-time comparison) |
| **Brute Force** | Rate limiting (5 محاولات/15 دقيقة) |
| **Session Hijacking** | httpOnly + secure + sameSite=strict cookies |
| **Clickjacking** | X-Frame-Options: DENY |
| **MIME Sniffing** | X-Content-Type-Options: nosniff |
| **Downgrade Attacks** | HSTS (Strict-Transport-Security) |
| **Data Injection** | CSP (Content-Security-Policy) |
| **Password Attacks** | bcrypt (10 rounds) + قوة كلمة المرور |

#### 📝 سجل التدقيق (Audit Logging)
كل الأحداث الأمنية تُسجَّل:
- LOGIN_ATTEMPT / LOGIN_SUCCESS / LOGIN_FAILED
- RATE_LIMIT
- CSRF_FAILED
- INVALID_INPUT

### 4️⃣ تطبيق ويب تقدمي (PWA)

#### 📱 التثبيت كتطبيق
- **manifest.json** كامل
- **Service Worker** للعمل offline
- **3 اختصارات** (Shortcuts):
  - التسجيل
  - متابعة الطلب
  - كيف أقدر أخدمك؟
- **iOS Apple Web App** meta tags
- **Theming**: أزرق شركاتي (#0f2c5c)

#### ⚡ المميزات
- يعمل **offline** (للصفحات المُخزّنة)
- **سريع التحميل** (caching)
- **تجربة أصيلة** كتطبيق مستقل
- **إشعارات** (قابلة للتطوير مستقبلاً)

### 5️⃣ النظام التصميمي (Design System)

#### 🎨 لوحة الألوان
| اللون | الاستخدام |
|------|-----------|
| Corporate `#0f2c5c` | أزرق شركاتي عميق |
| Gold `#c9a55a` | ذهبي فاخر |
| Emerald `#10b981` | زمردي (نجاح) |
| Kid-Yellow `#facc15` | أصفر طفولي (للأيقونات) |
| Kid-Orange `#f97316` | برتقالي (gradient) |
| Kid-Red `#ef4444` | أحمر (للأخطاء) |
| Kid-Green `#22c55e` | أخضر (للنجاح) |
| Kid-Blue `#3b82f6` | أزرق (للروابط) |
| Kid-Purple `#a855f7` | بنفسجي (للتمييز) |
| Kid-Pink `#ec4899` | وردي (للجمال) |

#### ✨ تأثيرات 3D
- `perspective-1000/1500/2000`
- `card-3d`, `card-3d-tilt`, `card-3d-lift`
- `shadow-3d`, `shadow-3d-pop`, `shadow-3d-kid`
- `animate-float`, `animate-wiggle`, `animate-bounce-in`
- `shine-on-hover`

### 6️⃣ البريد الإلكتروني (Email Notifications)

#### 📧 عبر Resend
عند كل تسجيل جديد، يتم إرسال **بريدين**:

1. **للإدارة** (`n7walmostqbl@gmail.com`):
   - تفاصيل الطلب كاملة
   - اسم الطالب، الميلاد، المستوى
   - بيانات ولي الأمر
   - رقم الطلب الفريد

2. **لولي الأمر**:
   - تأكيد استلام الطلب
   - رقم الطلب للمتابعة
   - رقم التواصل
   - رسالة "سنتواصل خلال 2-3 أيام"

#### 🎨 قوالب HTML
- تصميم RTL احترافي
- ترويسة بتدرج شعاري
- جدول بيانات منظم
- صناديق تظليل ملونة
- معلومات التواصل

### 7️⃣ التكامل مع الخارج

#### 📱 السوشل ميديا
- **TikTok**: https://www.tiktok.com/@n7w_almostqbl
- **Instagram**: https://www.instagram.com/n7walmostqbl
- **Snapchat**: https://www.snapchat.com/@n7w-almostqbl

#### 🗺️ Google Maps
- الموقع الجغرافي الفعلي (مكة المكرمة)
- إحداثيات: 21.4794847, 39.8373745
- خريطة مدمجة (iframe)
- رابط مباشر لفتح في Google Maps

#### 💬 WhatsApp
- زر عائم نابض (أخضر)
- الرقم: +966 53 209 3435
- رسالة جاهزة مسبقاً
- متاح في كل الصفحات

---

## 🔑 بيانات الدخول للإدارة

- **الرابط**: https://future-oriented-school.vercel.app/admin/login
- **البريد**: `n7walmostqbl@gmail.com`
- **كلمة المرور**: `Admin@2026`

---

## 🚀 كيفية الاستخدام

### لولي الأمر:
1. ادخل الموقع → اضغط "سجّل الآن"
2. املأ الاستمارة (6 خطوات)
3. ارفع المستندات المطلوبة
4. احفظ رقم الطلب
5. تابع حالة طلبك عبر "متابعة الطلب"

### للإدارة:
1. ادخل `/admin/login`
2. سجّل الدخول بالبيانات أعلاه
3. راجع الطلبات في الجدول
4. اضغط "عرض" لرؤية التفاصيل
5. غيّر الحالة (مقبول → مقابلة → مباشرة)
6. عند "تم المباشرة" → يُنشأ ملف طالب تلقائياً

### تثبيت التطبيق على الجوال:
- **Android**: افتح الموقع في Chrome → القائمة → "Add to Home screen"
- **iPhone**: افتح الموقع في Safari → زر المشاركة → "Add to Home Screen"

---

## 📊 الإحصائيات الحالية في قاعدة البيانات

- 1 حساب إدارة
- 4 طلبات تسجيل تجريبية:
  - FOSC-2026-0001: أحمد محمد العتيبي (قيد المراجعة)
  - FOSC-2026-0002: سارة عبدالله القحطاني (مقبول)
  - FOSC-2026-0003: ليان خالد الشهري (موعد مقابلة)
  - FOSC-2026-0004: اختبار بريد إلكتروني (قيد المراجعة)

---

## 🛠️ الصيانة والتطوير المستقبلي

### إضافة ميزات جديدة:
1. عدّل الكود محلياً
2. اختبر: `bun run dev`
3. ارفع: `git push origin main`
4. Vercel سيعيد النشر تلقائياً

### تغيير كلمة مرور الإدارة:
```bash
# عدّل scripts/seed.ts ثم:
bun run scripts/seed.ts
```

### نسخ احتياطي لقاعدة البيانات:
- Neon يوفّر نسخ تلقائية
- يمكن التصدير من: https://console.neon.tech

---

## 📞 الدعم والتواصل

- **البريد**: n7walmostqbl@gmail.com
- **واتساب**: +966 53 209 3435
- **الموقع**: مكة المكرمة، السعودية

---

© 2026 روضة نحو المستقبل — صُمّم بكل ❤ حب بواسطة [خالد محمد](https://khalid-cyber-security.vercel.app/)
