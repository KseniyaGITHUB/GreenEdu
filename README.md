# Зеленое образование

Онлайн-платформа экологического образования: 4 курса, PDF-лекции, тесты, видео.

**Демо:** https://canwant.ru/eco/

**Архив:** [GreenEdu-latest.zip](./GreenEdu-latest.zip)

## Состав проекта

| Раздел | Путь |
|--------|------|
| Главная | `src/app/page.tsx` |
| Список курсов | `src/app/courses/page.tsx` |
| Курс (лекции, тесты, видео) | `src/app/courses/[id]/page.tsx` |
| О нас | `src/app/(public)/about/` |
| Данные курсов | `src/config/coursesData.ts` |
| PDF лекций | `public/pdfs/` |
| Вход / регистрация | NextAuth + `prisma/` |

Курсы открыты **без входа**. Вход нужен для регистрации личного аккаунта.

## Запуск локально

### Windows (PowerShell)

1. Установите [Node.js LTS](https://nodejs.org/) и [Docker Desktop](https://www.docker.com/products/docker-desktop/) — Docker должен быть **запущен**.
2. Скачайте **актуальный** репозиторий: https://github.com/KseniyaGITHUB/GreenEdu (не старый архив с `setup.mjs` / `ЗАПУСК.bat`).
3. В папке проекта:

```powershell
.\start-windows.ps1
```

Если PowerShell блокирует скрипт один раз:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\start-windows.ps1
```

### Linux / macOS

```bash
cp .env.example .env
docker compose up -d
npm install
npm run db:push
npm run db:seed
npm run dev
```

Сайт: http://localhost:3000

Для деплоя как на canwant.ru задайте `NEXT_PUBLIC_BASE_PATH=/eco` в `.env` перед `npm run build`.

## Демо-аккаунт

| Email | Пароль |
|-------|--------|
| `demo@demo.ru` | `demo1234` |

## Стек

Next.js 15 · React 19 · PostgreSQL · Prisma · NextAuth · HeroUI

---

© VSTU
