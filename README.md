# GreenEdu — Зелёное образование

Онлайн-платформа экологического образования: курсы по устойчивому развитию, лекции в PDF, видео и тесты. Next.js 15, PostgreSQL, NextAuth.

**Демо:** https://canwant.ru/eco/

## Быстрый запуск (Windows)

1. [Node.js LTS](https://nodejs.org/) — установить один раз  
2. [Docker Desktop](https://www.docker.com/products/docker-desktop/) — установить и запустить  
3. Распаковать проект → **дважды щёлкнуть `ЗАПУСК.bat`**

Сайт: **http://localhost:3000**

| Email | Пароль |
|-------|--------|
| `demo@demo.ru` | `demo1234` |

## Инструкции

| Файл | Для кого |
|------|----------|
| **[ЗАПУСК-ДЛЯ-ДЕТЕЙ.md](./ЗАПУСК-ДЛЯ-ДЕТЕЙ.md)** | пошагово «куда нажимать» — для школьников |
| **[ZAPUSK.md](./ZAPUSK.md)** | подробная инструкция для всех |
| **[КАК-УПАКОВАТЬ-В-АРХИВ.txt](./КАК-УПАКОВАТЬ-В-АРХИВ.txt)** | как собрать zip для передачи |

## Команды

```bash
npm run go      # настройка + запуск (рекомендуется)
npm run setup   # только настройка БД
npm run dev     # только сайт (если setup уже был)
npm run build   # production-сборка
```

## Стек

- Next.js 15, React 19, TypeScript  
- PostgreSQL 16 (Docker), Prisma  
- NextAuth v5, HeroUI  

## Репозиторий

https://github.com/ADAMANTOBLAST/GreenEdu

---

© VSTU — все права защищены
