@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo  ========================================
echo    Зеленое образование
echo    Автоматический запуск
echo  ========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [ОШИБКА] Node.js не установлен.
  echo Скачайте LTS с https://nodejs.org/ и запустите снова.
  pause
  exit /b 1
)

where docker >nul 2>&1
if errorlevel 1 (
  echo [ОШИБКА] Docker не найден.
  echo Установите Docker Desktop: https://www.docker.com/products/docker-desktop/
  echo Запустите Docker Desktop и повторите.
  pause
  exit /b 1
)

call npm run go

echo.
echo  Сервер остановлен.
pause
