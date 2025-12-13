# LeadGenius - AI B2B Lead Generator

A production-ready SaaS platform that uses AI to discover B2B leads, enrich data, and generate personalized cold emails.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js v5
- **AI:** OpenAI API (GPT-4)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Copy `.env.local.example` to `.env.local` and fill in your keys.
   ```bash
   cp .env.local.example .env.local
   ```
   
   Ensure you have a PostgreSQL database running and update `DATABASE_URL` in `.env` (or `.env.local` for Next.js, but Prisma requires `.env` or explicit env var).

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Features
- **AI Lead Discovery:** Find companies matching your criteria.
- **Smart Scoring:** AI scores leads based on fit (0-100).
- **Email Automation:** Generate and send personalized sequences.
- **Analytics:** Track opens, clicks, and pipeline health.

## Deployment
Deploy to Vercel:
```bash
vercel
```
Ensure all environment variables are set in the Vercel project settings.
