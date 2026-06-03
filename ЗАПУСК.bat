@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo  ========================================
echo    Зеленое образование — GreenEdu
echo    Актуальный запуск (2026)
echo  ========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [ОШИБКА] Node.js не установлен.
  echo Скачайте LTS с https://nodejs.org/
  pause
  exit /b 1
)

where docker >nul 2>&1
if errorlevel 1 (
  echo [ОШИБКА] Docker не найден.
  echo Установите Docker Desktop и запустите его.
  echo https://www.docker.com/products/docker-desktop/
  pause
  exit /b 1
)

if not exist package.json (
  echo [ОШИБКА] Запускайте bat из корня проекта GreenEdu
  echo ^(рядом с package.json^).
  pause
  exit /b 1
)

if not exist .env (
  if exist .env.example (
    copy /Y .env.example .env >nul
    echo [OK] Создан файл .env
  ) else (
    echo [ОШИБКА] Нет .env.example
    pause
    exit /b 1
  )
)

echo [1/5] PostgreSQL в Docker...
docker compose up -d
if errorlevel 1 (
  echo [ОШИБКА] docker compose up -d
  pause
  exit /b 1
)

echo [2/5] Ждем базу данных ^(до 2 мин^)...
set /a WAIT=0
:WAITDB
docker exec green-edu-postgres pg_isready -U postgres -d green_education >nul 2>&1
if not errorlevel 1 goto DBOK
set /a WAIT+=1
if %WAIT% geq 60 (
  echo [ОШИБКА] PostgreSQL не ответил. Проверьте: docker logs green-edu-postgres
  pause
  exit /b 1
)
ping -n 3 127.0.0.1 >nul
goto WAITDB
:DBOK
echo [OK] База готова

echo [3/5] npm install...
call npm install
if errorlevel 1 (
  echo [ОШИБКА] npm install
  pause
  exit /b 1
)

echo [4/5] Таблицы и демо-пользователь...
call npm run db:push
if errorlevel 1 (
  echo [ОШИБКА] npm run db:push
  pause
  exit /b 1
)
call npm run db:seed
if errorlevel 1 (
  echo [ОШИБКА] npm run db:seed
  pause
  exit /b 1
)

echo.
echo  ========================================
echo    Готово! Сайт: http://localhost:3000
echo    Курсы:  http://localhost:3000/courses
echo    Демо:   demo@demo.ru / demo1234
echo  ========================================
echo.
echo [5/5] Запуск npm run dev...
echo      Закройте окно или Ctrl+C чтобы остановить.
echo.

call npm run dev

echo.
echo  Сервер остановлен.
pause
