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

## Запуск локально (Windows)

**Подробно:** [ZAPUSK.md](./ZAPUSK.md)

1. [Node.js LTS](https://nodejs.org/) + [Docker Desktop](https://www.docker.com/products/docker-desktop/) — Docker **запущен**
2. `git clone https://github.com/KseniyaGITHUB/GreenEdu.git` → `cd GreenEdu`
3. Дважды щёлкните **[ЗАПУСК.bat](./ЗАПУСК.bat)**

Или в PowerShell: `.\start-windows.ps1`

Сайт: http://localhost:3000 · Курсы: http://localhost:3000/courses

### Linux / macOS

```bash
cp .env.example .env && docker compose up -d
npm install && npm run db:push && npm run db:seed && npm run dev
```

Для деплоя как на canwant.ru задайте `NEXT_PUBLIC_BASE_PATH=/eco` в `.env` перед `npm run build`.

## Демо-аккаунт

| Email | Пароль |
|-------|--------|
| `demo@demo.ru` | `demo1234` |

## Стек

Next.js 15 · React 19 · PostgreSQL · Prisma · NextAuth · HeroUI

---

© VSTU
