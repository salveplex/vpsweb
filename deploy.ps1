Write-Host "Building project..."
npm run build

Write-Host "Creating remote directory..."
ssh -o BatchMode=yes vosstaxi@85.190.102.196 "mkdir -p ~/sites/vpsweb_test"

Write-Host "Uploading files..."
scp -o BatchMode=yes -r dist/* vosstaxi@85.190.102.196:~/sites/vpsweb_test/

Write-Host "Restarting PM2 server on VPS..."
ssh -o BatchMode=yes vosstaxi@85.190.102.196 "cd ~/sites/vpsweb_test && pm2 delete vpsweb_test 2>/dev/null; pm2 serve . 3050 --name 'vpsweb_test' --spa"

Write-Host "Deployment complete! Access at http://85.190.102.196:3050"
