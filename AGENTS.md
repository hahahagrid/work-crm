# 🤖 AGENTS.md — Project Conventions for AI Agents

**Назначение:** Этот файл — "память" для AI агентов. Он описывает архитектуру, соглашения и правила этого конкретного проекта, чтобы агент мог сразу понять контекст без повторных объяснений.

---

## 📦 Монорепозиторий: Структура

```
Work_CRM/               ← Корень репозитория
├── crm-app/            ← Next.js приложение (основная CRM)
│   ├── src/
│   │   ├── app/        ← App Router (страницы и API роуты)
│   │   └── components/ ← UI компоненты
│   ├── prisma/         ← Схема БД и миграции
│   └── package.json
├── upwork-extension/   ← Chrome Extension (MV3)
│   ├── manifest.json
│   └── content.js
├── PRD.md              ← Product Requirements (источник правды)
├── AGENTS.md           ← Этот файл
├── README.md
├── .gitignore
└── .env.example
```

---

## 🛠️ Технологический стек

- **Framework:** Next.js 14 (App Router)
- **ORM:** Prisma 7 + PostgreSQL
- **Styling:** Tailwind CSS v3 + TypeScript
- **Extension:** Chrome MV3 — content script только, без popup
- **Хостинг:** Vercel (app) + Railway (database)

---

## 🔑 Ключевые соглашения

### API Routes (crm-app)
- Все API роуты живут в `src/app/api/`
- Эндпоинт для расширения: `POST /api/extension/ping-received`
- Аутентификация расширения: `Authorization: Bearer ${EXTENSION_API_SECRET}` из `.env.local`

### База данных (Prisma)
- Схема в `crm-app/prisma/schema.prisma`
- Никогда не редактировать миграции вручную — только через `npx prisma migrate dev`
- После изменения схемы — всегда перегенерировать клиент: `npx prisma generate`

### Chrome Extension
- Extension общается с CRM только через `fetch()` к API роуту
- URL CRM в production передаётся через `manifest.json` → `host_permissions`
- В dev режиме хардкодить `http://localhost:3000` в `content.js` допустимо

---

## 🌿 Git Workflow

- **`main`** — production. Push запрещён агентам, только через Pull Request.
- **`dev`** — активная ветка разработки. Агент пушит сюда только с явного разрешения пользователя.
- Коммиты писать по формату: `feat: добавить модель Lead в Prisma схему`

---

## 📋 PRD (Источник правды)

Перед началом работы всегда читать `/PRD.md`. Там описаны:
- Бизнес-логика пингов (3 дня, 10 дней, сброс счётчика)
- Требования к Extension (без нарушения TOS Upwork)
- MVP скоуп фазы 1

---

## ⚠️ Важные ограничения

1. **НЕ использовать Upwork API напрямую** — только DOM мониторинг через MutationObserver
2. **НЕ хранить данные пользователей Upwork** в БД — только факт наличия ответа (boolean + timestamp)
3. **ВСЕГДА проверять** что `.env.local` в `.gitignore` перед любым коммитом
