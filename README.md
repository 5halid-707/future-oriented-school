# 🎓 مدرسة نحو المستقبل — Future-Oriented School

نظام قبول وتسجيل إلكتروني متكامل لمدرسة نحو المستقبل.

A complete student admission & registration system for Future-Oriented School.

## ✨ Features

- **Smart Application Form** — Multi-step registration (Student → Parent → Contact → Medical → Documents → Review)
- **Document Upload** — Birth certificate, National ID, Medical report with instant validation
- **Application Tracking** — Parents track status: Under Review → Accepted → Interview → Enrolled
- **Admin Dashboard** — Full management at `/admin` with stats, filters, status changes
- **Automated Conversion** — Approved applications auto-convert to official student profiles
- **Bilingual (Arabic/English)** — RTL by default with one-tap language toggle
- **Social Media Integration** — TikTok, Instagram, Snapchat links in footer

## 🚀 Deploy to Vercel

### Step 1: Create a Neon PostgreSQL Database (Free)

1. Go to https://neon.tech and sign up
2. Create a new project
3. Copy the connection string (looks like `postgresql://...`)

### Step 2: Import to Vercel

1. Go to https://vercel.com/new
2. Import the GitHub repo `5halid-707/future-oriented-school`
3. In "Configure Project":
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `next build` (auto)
   - **Output Directory**: `.next` (auto)
4. In "Environment Variables", add:
   - **Key**: `DATABASE_URL`
   - **Value**: your Neon connection string from Step 1
5. Click **Deploy**!

### Step 3: Initialize Database

After the first deployment:

1. Go to your Vercel project → Settings → Functions
2. Or run locally:
   ```bash
   DATABASE_URL="your-neon-url" bun run db:push
   DATABASE_URL="your-neon-url" bun run db:seed
   ```

### Step 4: Login to Admin

- URL: `https://your-project.vercel.app/admin/login`
- Email: `n7walmostqbl@gmail.com`
- Password: `Admin@2026` (change this in production!)

## 🛠️ Local Development

```bash
# Install dependencies
bun install

# Set up database URL in .env
cp .env.example .env
# Edit .env with your Neon URL

# Push schema to database
bun run db:push

# Seed sample data
bun run db:seed

# Start dev server
bun run dev
```

Open http://localhost:3000

## 📁 Project Structure

```
├── prisma/
│   └── schema.prisma          # Database schema (PostgreSQL)
├── public/
│   ├── school-logo.jpeg       # School logo
│   └── favicon.svg
├── scripts/
│   └── seed.ts                # Sample data + admin user
├── src/
│   ├── app/
│   │   ├── page.tsx           # Public site (home, apply, track)
│   │   ├── admin/
│   │   │   ├── page.tsx       # Admin dashboard
│   │   │   └── login/page.tsx # Admin login
│   │   ├── api/
│   │   │   ├── applications/  # Submit, track, list, [id]
│   │   │   └── auth/          # login, logout, me
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── site/              # Site-specific components
│   │   └── ui/                # shadcn/ui components
│   └── lib/
│       ├── db.ts              # Prisma client
│       └── auth.ts            # Session token utilities
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

## 🔐 Admin Credentials (Default)

- **Email**: `n7walmostqbl@gmail.com`
- **Password**: `Admin@2026`

⚠️ **Change these in production** by editing `scripts/seed.ts` and re-running `bun run db:seed`.

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: PostgreSQL (Neon recommended)
- **ORM**: Prisma 6
- **Auth**: bcryptjs + httpOnly cookies
- **Fonts**: Cairo (Arabic + Latin)
- **Icons**: Lucide React

## 📞 Contact

- **Email**: n7walmostqbl@gmail.com
- **TikTok**: https://www.tiktok.com/@n7w_almostqbl
- **Instagram**: https://www.instagram.com/n7walmostqbl
- **Snapchat**: https://www.snapchat.com/@n7w-almostqbl

## 📄 License

© 2026 Future-Oriented School. All rights reserved.
