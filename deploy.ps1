# Quick Deploy to GitHub

Write-Host "🚀 Deploying FestaMagusto to GitHub..." -ForegroundColor Cyan

# Stage all changes
git add .

# Commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Update FestaMagusto - $timestamp"

# Push to GitHub
git push origin main

Write-Host "✅ Push complete! Check GitHub Actions for build status." -ForegroundColor Green
Write-Host "🔗 Actions: https://github.com/valente-coding/valente-coding.github.io/actions" -ForegroundColor Yellow
