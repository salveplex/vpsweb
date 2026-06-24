Write-Host "Building project..."
npm run build

Write-Host "Creating remote directory..."
ssh -o BatchMode=yes vosstaxi@85.190.102.196 "mkdir -p ~/sites/vpsweb/dist"

Write-Host "Cleaning up old files..."
ssh -o BatchMode=yes vosstaxi@85.190.102.196 "rm -rf ~/sites/vpsweb/dist/*"

Write-Host "Uploading files..."
scp -o BatchMode=yes -r dist/* vosstaxi@85.190.102.196:~/sites/vpsweb/dist/
scp -o BatchMode=yes server.js vosstaxi@85.190.102.196:~/sites/vpsweb/server.js
scp -o BatchMode=yes .env.server vosstaxi@85.190.102.196:~/sites/vpsweb/.env

Write-Host "Restarting LIVE PM2 server on VPS..."
ssh -o BatchMode=yes vosstaxi@85.190.102.196 "pm2 restart vpsweb"

Write-Host "Deployment to LIVE complete! Access at https://vosstaxi.no"
