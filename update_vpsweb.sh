#!/bin/bash
echo "==> Deploying vpsweb to VPS test site..."

cd ~/sites
if [ ! -d "vpsweb_test" ]; then
  echo "==> Cloning repository for the first time..."
  git clone git@github.com:salveplex/vpsweb.git vpsweb_test
fi

cd vpsweb_test
echo "==> Pulling latest changes from Git..."
git pull origin main

echo "==> Installing dependencies..."
npm install

echo "==> Building project..."
npm run build

echo "==> Restarting PM2 server..."
pm2 delete vpsweb_test 2>/dev/null
pm2 serve dist 3050 --name 'vpsweb_test' --spa

echo "==> Deployment complete!"
