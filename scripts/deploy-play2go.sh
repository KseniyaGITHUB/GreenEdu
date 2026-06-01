#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/root/Projects/green-education"
PORT=9021
BASE_PATH="/eco"

cd "$APP_DIR"

echo "[1/6] PostgreSQL (Docker)..."
docker compose up -d
for i in $(seq 1 30); do
  if docker exec green-edu-postgres pg_isready -U postgres -d tatrian_kitchen >/dev/null 2>&1; then
    echo "  DB ready"
    break
  fi
  sleep 1
done

echo "[2/6] npm install..."
npm ci

echo "[3/6] Prisma..."
npx prisma db push
npx tsx prisma/seed.ts

echo "[4/6] Build..."
export NODE_ENV=production
export NEXT_PUBLIC_BASE_PATH="$BASE_PATH"
export DATABASE_URL="postgresql://postgres:rootroot@127.0.0.1:5433/tatrian_kitchen?schema=public"
export AUTH_SECRET="green-edu-play2go-prod-secret-2026"
export AUTH_TRUST_HOST=true
npm run build

echo "[5/6] systemd service..."
cat > /etc/systemd/system/green-education.service <<EOF
[Unit]
Description=Зеленое образование (Next.js) — https://canwant.ru/eco/
After=network.target docker.service

[Service]
Type=simple
User=root
WorkingDirectory=$APP_DIR
Environment=NODE_ENV=production
Environment=PORT=$PORT
Environment=NEXT_PUBLIC_BASE_PATH=$BASE_PATH
Environment=DATABASE_URL=postgresql://postgres:rootroot@127.0.0.1:5433/tatrian_kitchen?schema=public
Environment=AUTH_SECRET=green-edu-play2go-prod-secret-2026
Environment=AUTH_TRUST_HOST=true
ExecStart=/usr/bin/node $APP_DIR/node_modules/next/dist/bin/next start -H 127.0.0.1 -p $PORT
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable green-education.service
systemctl restart green-education.service

echo "[6/6] nginx..."
if ! grep -q 'Зеленое образование' /etc/nginx/sites-enabled/canwant.ru; then
  cp /etc/nginx/sites-enabled/canwant.ru /etc/nginx/sites-enabled/canwant.ru.bak-green-edu
  cat > /tmp/green-edu-nginx.conf <<'NGINX'

    # Зеленое образование (Next.js на 9021)
    location ^~ /eco {
        proxy_pass http://127.0.0.1:9021;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_buffering off;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
NGINX
  awk '
    /location \^~ \/teriberka/ && !done {
      while ((getline line < "/tmp/green-edu-nginx.conf") > 0) print line
      close("/tmp/green-edu-nginx.conf")
      done=1
    }
    { print }
  ' /etc/nginx/sites-enabled/canwant.ru > /tmp/canwant.ru.new
  mv /tmp/canwant.ru.new /etc/nginx/sites-enabled/canwant.ru
  nginx -t
  systemctl reload nginx
fi

echo ""
echo "Done: https://canwant.ru/eco/"
echo "Demo: demo@demo.ru / demo1234"
systemctl --no-pager status green-education.service | head -8
