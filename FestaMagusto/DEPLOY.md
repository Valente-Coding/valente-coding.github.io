# GitHub Deployment Setup

## 🚀 Quick Start - Push to GitHub

Your site will automatically build and deploy when you push to GitHub!

## 📋 Setup Steps

### 1. Add GitHub Secrets

Go to your GitHub repository and add these secrets:

**Repository Settings → Secrets and variables → Actions → New repository secret**

Add these **7 secrets**:

| Secret Name | Value |
|-------------|-------|
| `FIREBASE_API_KEY` | `AIzaSyCqKXQJKXObwyXpVS3bITdXiIumhGlMg6w` |
| `FIREBASE_AUTH_DOMAIN` | `festamae-36e11.firebaseapp.com` |
| `FIREBASE_PROJECT_ID` | `festamae-36e11` |
| `FIREBASE_STORAGE_BUCKET` | `festamae-36e11.firebasestorage.app` |
| `FIREBASE_MESSAGING_SENDER_ID` | `112782501393` |
| `FIREBASE_APP_ID` | `1:112782501393:web:c612e27e4ac466c61333b0` |
| `FIREBASE_MEASUREMENT_ID` | `G-DLPJYRZN0Q` |

### 2. Commit and Push

```bash
git add .
git commit -m "Add build system with environment variables"
git push origin main
```

### 3. Check GitHub Actions

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You should see the workflow running
4. Wait for it to complete (usually 1-2 minutes)

### 4. Access Your Site

Once deployed, your site will be at:
`https://valente-coding.github.io/FestaMagusto/`

## 🔄 Automatic Deployment

Every time you push changes to the `FestaMagusto/` folder, GitHub Actions will:
1. Install dependencies
2. Build with Vite (using your secrets)
3. Deploy to GitHub Pages

## ✅ What's Ready

- ✅ Workflow file created (`.github/workflows/deploy-festamagusto.yml`)
- ✅ Package.json configured
- ✅ Vite config ready
- ✅ Environment variables in HTML
- ✅ .gitignore set up

## 🎯 Next Steps

1. **Add the 7 secrets to GitHub** (most important!)
2. **Commit and push your code**
3. **Watch the Actions tab** - your site will deploy automatically!

## 🐛 Troubleshooting

**Workflow fails:**
- Check all 7 secrets are added
- Secret names are case-sensitive
- Verify you're pushing to `main` or `master` branch

**Site not loading:**
- Wait for Actions to complete
- Check GitHub Pages is enabled in Settings
- Clear browser cache

## 📝 Making Changes

Just edit your files and push:
```bash
git add .
git commit -m "Your changes"
git push
```

The site rebuilds automatically! 🎉
