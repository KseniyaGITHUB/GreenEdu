$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "  Зеленое образование — запуск (Windows)"
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Error "Node.js не найден. Установите LTS с https://nodejs.org/"
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Error "Docker не найден. Запустите Docker Desktop."
}

if (-not (Test-Path .env)) {
  Copy-Item .env.example .env
  Write-Host "  Создан файл .env из .env.example"
}

Write-Host "[1/5] PostgreSQL в Docker..."
docker compose up -d

Write-Host "[2/5] Ждём базу данных..."
$ready = $false
for ($i = 1; $i -le 60; $i++) {
  docker exec green-edu-postgres pg_isready -U postgres -d green_education 2>$null | Out-Null
  if ($LASTEXITCODE -eq 0) {
    $ready = $true
    break
  }
  Start-Sleep -Seconds 2
}
if (-not $ready) {
  Write-Error "PostgreSQL не ответил за 2 минуты. Проверьте: docker ps && docker logs green-edu-postgres"
}

Write-Host "[3/5] npm install..."
npm install

Write-Host "[4/5] База и демо-пользователь..."
npm run db:push
npm run db:seed

Write-Host "[5/5] Запуск сайта..."
Write-Host ""
Write-Host "  Откройте: http://localhost:3000"
Write-Host "  Демо: demo@demo.ru / demo1234"
Write-Host ""
npm run dev
