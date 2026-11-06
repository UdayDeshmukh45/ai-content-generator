# 🤖 AI Content Generator

A full-stack, AI-powered content generation SaaS application built with **Next.js 14**, **Google Gemini 1.5 Flash**, **Neon Serverless PostgreSQL**, **Drizzle ORM**, **Clerk Authentication**, and **Tailwind CSS**.

---

## 📸 Screenshots & UI Preview

### 🏠 Dashboard & AI Templates
Explore 10+ pre-configured AI generation templates with search and category filtering.
![Dashboard & Templates](screenshots/dashboard.svg)

---

### ✨ Content Generator & Rich Text WYSIWYG Editor
Generate custom code, blog posts, and copy with real-time markdown formatting and 1-click clipboard copy.
![AI Content Studio](screenshots/generator.svg)

---

### 🚀 Landing Page
Modern responsive landing page featuring smooth gradients and product highlights.
![Landing Page](screenshots/landing.svg)

---

## ✨ Features

- 🧠 **Google Gemini 1.5 Flash Integration**: Ultra-fast content generation with high token context and custom prompt pipelines.
- 📑 **10+ Prebuilt Production Templates**:
  - **Coding**: Code Generator, Code Explainer (line-by-line), and Code Bug Detector & Fixer.
  - **Blogging**: Blog Title Creator, Article Outline & Content Generator, and Topic Ideation.
  - **Social Media & Video**: YouTube Description Generator with emojis, Instagram Post Creator.
  - **Writing Tools**: Plagiarism-free Article Rewriter, Text Improver, and English Grammar Checker.
- 📝 **Rich Text WYSIWYG Editor**: Interactive Markdown editor powered by Toast UI with real-time preview and one-click copy to clipboard.
- 🔐 **Authentication & User Management**: Secure authentication, user profile management, and route protection using Clerk.
- 🗄️ **Persistent Generation History**: All AI queries, outputs, timestamps, and word counts are stored in Neon Serverless PostgreSQL via Drizzle ORM.
- 🔍 **Interactive Search**: Real-time search filter for instantly finding AI templates.
- 🎨 **Modern Responsive UI**: Built with Tailwind CSS and Radix UI primitives.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **AI Model** | [Google Gemini 1.5 Flash](https://ai.google.dev/) via `@google/generative-ai` |
| **Database** | [Neon Serverless PostgreSQL](https://neon.tech/) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) & Drizzle Kit |
| **Authentication** | [Clerk](https://clerk.com/) |
| **Rich Text Editor** | [Toast UI Editor](https://ui.toast.com/tui-editor) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: v18.17 or higher
- **npm** / **yarn** / **pnpm**
- Accounts for:
  - [Google AI Studio](https://aistudio.google.com/) (for Gemini API Key)
  - [Clerk](https://clerk.com/) (for Auth keys)
  - [Neon Console](https://neon.tech/) (for Postgres DB URL)

### 2. Clone and Install

```bash
git clone https://github.com/your-username/ai-content-generator.git
cd ai-content-generator
npm install
```

### 3. Configure Environment Variables

Create a `.env` or `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini API
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_gemini_api_key

# Neon Database URL
NEXT_PUBLIC_DRIZZLE_DB_URL=postgresql://user:password@host/neondb?sslmode=require
```

### 4. Push Database Schema

Push the schema to your Neon PostgreSQL database using Drizzle Kit:

```bash
npm run db:push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

- `npm run dev` - Starts the development server on `http://localhost:3000`
- `npm run build` - Builds the application for production
- `npm run start` - Runs the built production server
- `npm run db:push` - Synchronizes your Drizzle schema with your PostgreSQL database
- `npm run db:studio` - Launches Drizzle Studio to inspect and manage database records

---

## 📂 Project Structure

```text
├── app/
│   ├── (auth)/                  # Clerk Sign-in and Sign-up routes
│   ├── (data)/Templates.tsx     # AI template definitions & prompt engineering
│   ├── dashboard/               # Dashboard layout, pages, and components
│   │   ├── content/[template-slug]/  # Template-specific content generator page
│   │   ├── history/             # Generation history with copy & word count
│   │   ├── settings/            # User profile settings (Clerk)
│   │   └── _components/         # SideNav, Header, SearchSection, TemplateCard
│   ├── layout.tsx               # Root layout with ClerkProvider & local fonts
│   └── page.tsx                 # Landing page
├── components/ui/               # Reusable Radix UI components (Button, Input, etc.)
├── utils/
│   ├── AiModal.tsx              # Google Gemini AI client configuration
│   ├── db.tsx                   # Neon Postgres & Drizzle client
│   └── schema.tsx               # Drizzle database tables schema
├── drizzle.config.js            # Drizzle Kit configuration
└── next.config.mjs              # Next.js configuration
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
