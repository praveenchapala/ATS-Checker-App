Write-Host "Installing ATS Checker App..." -ForegroundColor Green
Write-Host ""

Write-Host "Installing root dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Installing server dependencies..." -ForegroundColor Yellow
Set-Location server
npm install
Set-Location ..

Write-Host ""
Write-Host "Installing client dependencies..." -ForegroundColor Yellow
Set-Location client
npm install
Set-Location ..

Write-Host ""
Write-Host "Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application, run: npm run dev" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to continue" 