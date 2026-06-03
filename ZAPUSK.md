# Зеленое образование — запуск на Windows

Актуальная инструкция для проекта **GreenEdu**  
Репозиторий: https://github.com/KseniyaGITHUB/GreenEdu

> **Не используйте** старые копии из Telegram Desktop — скачивайте только с GitHub.

---

## Быстрый старт (3 шага)

1. Установите [Node.js LTS](https://nodejs.org/) и [Docker Desktop](https://www.docker.com/products/docker-desktop/) — Docker **запущен**.
2. Скачайте проект:
   ```powershell
   git clone https://github.com/KseniyaGITHUB/GreenEdu.git
   cd GreenEdu
   ```
   или распакуйте **GreenEdu-latest.zip** из репозитория.
3. Дважды щёлкните **`ЗАПУСК.bat`** в корне проекта.

Сайт: http://localhost:3000 · Курсы: http://localhost:3000/courses

---

## Что нужно один раз установить

| Программа | Зачем | Ссылка |
|-----------|--------|--------|
| **Node.js LTS** (20 или 22) | запуск сайта | https://nodejs.org/ |
| **Docker Desktop** | база PostgreSQL | https://www.docker.com/products/docker-desktop/ |
| **Git** (по желанию) | скачать проект | https://git-scm.com/ |

Проверка в PowerShell:

```powershell
node -v
docker --version
docker ps
```

---

## Что делает ЗАПУСК.bat

- создаёт `.env` из `.env.example` (если его ещё нет);
- поднимает PostgreSQL в Docker (порт **5433**);
- `npm install` (первый раз долго);
- `npm run db:push` и `npm run db:seed` — таблицы и демо-пользователь;
- `npm run dev` — запуск сайта.

Альтернатива (PowerShell):

```powershell
.\start-windows.ps1
```

---

## Демо-вход

| Email | Пароль |
|-------|--------|
| `demo@demo.ru` | `demo1234` |

Курсы, PDF и тесты открываются **без входа**.

---

## Если что-то не работает

### Docker / база

- Docker Desktop запущен и загружен  
- `docker ps` — контейнер **`green-edu-postgres`**

### Порт 5433 занят

1. В `docker-compose.yml`: `"5433:5432"` → `"5434:5432"`  
2. В `.env`: в `DATABASE_URL` замените `:5433` на `:5434`  
3. Запустите `ЗАПУСК.bat` снова

### Вручную

```powershell
copy .env.example .env
docker compose up -d
npm install
npm run db:push
npm run db:seed
npm run dev
```

### Старая версия («только логин», рецепты)

Удалите папку и скачайте заново с https://github.com/KseniyaGITHUB/GreenEdu

---

## Как на canwant.ru (/eco)

Локально: http://localhost:3000 (префикс `/eco` не нужен).

Для деплоя как на сервере — в `.env`: `NEXT_PUBLIC_BASE_PATH=/eco` перед `npm run build`.

---

## Код страниц

| Страница | Файл |
|----------|------|
| Главная | `src/app/page.tsx` |
| Курсы | `src/app/courses/page.tsx` |
| Курс | `src/app/courses/[id]/page.tsx` |
| О нас | `src/app/(public)/about/page.tsx` |
| Данные курсов | `src/config/coursesData.ts` |

---

© VSTU
