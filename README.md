# TubeInsight Pro — Marketing Site

A standalone marketing/landing site for TubeInsight, kept separate from the main AI report tool (tubeinsight.pages.dev).

## What this site does

1. **Hero + Why section** — explains to creators why AI video reports help them get more views
2. **Sample reports** — pulls specific featured reports from your Supabase `reports` table (same DB as your main app) and links out to the full report on tubeinsight.pages.dev
3. **Contact form** — creators submit their YouTube URL + email, saved to a `leads` table in Supabase. You then manually run the analysis on tubeinsight.pages.dev and email them the link.
4. **Admin reports list** — a private, unlisted page at `/reports/vault-9k2x` that lists every report ever generated, linking to each one

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Add a `leads` table to Supabase

Run this in your Supabase SQL editor (same project as tubeinsight.pages.dev):

```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text not null,
  video_url text not null,
  notes text,
  created_at timestamp default now()
);

alter table leads enable row level security;
create policy "Public insert" on leads for insert with check (true);
-- No public read policy — only you can read leads via Supabase dashboard
```

### 3. Environment variables

Create `.env`:
```
VITE_SUPABASE_URL=https://whpbyripjukfvuukxtii.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-key
```

Same Supabase project as your main TubeInsight app.

### 4. Feature sample reports

Open `src/App.jsx` and find:
```js
const FEATURED_REPORT_IDS = [
  // "dQw4w9WgXcQ-k7x2m9",
];
```

Add the report IDs (from your tubeinsight.pages.dev URLs) you want to showcase, e.g.:
```js
const FEATURED_REPORT_IDS = [
  "dQw4w9WgXcQ-k7x2m9",
  "xAahlwH92zE-p3n8q1",
];
```

### 5. Change the admin secret path (recommended)

In `src/App.jsx`, change:
```js
const ADMIN_SECRET_PATH = "vault-9k2x";
```
to your own random string before deploying, so the URL isn't guessable.

Your private reports list will then be at:
```
https://your-domain.pages.dev/reports/YOUR_SECRET_PATH
```

### 6. Run locally
```bash
npm run dev -- --host
```

### 7. Deploy to Cloudflare Pages

Push to a **new GitHub repo** (separate from tubeinsight.pages.dev):
```bash
git init
git add .
git commit -m "tubeinsight pro landing site"
git remote add origin <your-new-repo-url>
git push -u origin main
```

Then in Cloudflare Pages:
- Create a **new project**, connect this repo
- Build command: `npm run build`
- Output directory: `dist`
- Add environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Add a `_redirects` file (see below) for client-side routing

Create `public/_redirects`:
```
/* /index.html 200
```

## Getting notified of new leads

Since leads save to Supabase, you can either:
- Check the Supabase dashboard manually (Table Editor → `leads`)
- Set up a Supabase Database Webhook to ping a Zapier/Make automation that emails you
- Later: add a Cloudflare Pages Function that also sends you an email via Resend or similar, in addition to the Supabase insert

For now, leads land in Supabase and you can check `kesarkar.gourav@gmail.com` is mentioned as the fallback direct-contact email on the form itself.
