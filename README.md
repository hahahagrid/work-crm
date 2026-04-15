# 📋 Sales CRM & Upwork Monitor

A custom CRM system for sales teams working on Upwork. Automates lead follow-up tracking ("pings") and detects client replies via a Chrome Extension to reset counters automatically — no more manual spreadsheets.

## 🏗️ Project Structure

```
Work_CRM/
├── crm-app/            # Next.js 14 + Prisma + Tailwind CRM web application
└── upwork-extension/   # Chrome Extension (content script) for Upwork monitoring
```

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend & Backend | Next.js 14 (App Router) |
| Database ORM | Prisma |
| Styling | Tailwind CSS + TypeScript |
| Database | PostgreSQL (Railway) |
| Deployment | Vercel |
| Extension | Chrome MV3 Content Script |

## 🚀 Getting Started

### 1. Install dependencies

```bash
cd crm-app && npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Edit .env.local and fill in your DATABASE_URL and EXTENSION_API_SECRET
```

### 3. Set up the database

```bash
cd crm-app
npx prisma migrate dev
```

### 4. Run the development server

```bash
cd crm-app && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 5. Load the Chrome Extension

1. Open Chrome → `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked** and select the `upwork-extension/` folder

## 📐 Core Features

- **Ping Timeline:** Auto-calculates follow-up dates (Day 3, Day 10) per lead
- **Auto-Reset:** Chrome Extension detects Upwork replies and resets ping counters via API
- **Manual Override:** Sales team can manually update lead status
- **Dashboard:** Table view sorted by "Next Ping Date" with urgency alerts

## 🔑 Key Scripts (`crm-app/`)

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint check
```

## 🌿 Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production — protected, updated via PR only |
| `dev` | Active development branch |

> ⚠️ Never push directly to `main`. All changes go through `dev` → PR → `main`.
