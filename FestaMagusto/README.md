# FestaMagusto - Product Manager

A mobile-first product management system with Firebase integration for tracking sales and analytics.

## 🚀 Setup

### Local Development

1. **Install dependencies**
   ```bash
   cd FestaMagusto
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env`** and add your Firebase credentials

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:5173 in your browser

### Production Build

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 🔐 GitHub Secrets Setup

To use GitHub Actions for automatic deployment, add these secrets to your repository:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

| Secret Name | Value |
|-------------|-------|
| `FIREBASE_API_KEY` | Your Firebase API Key |
| `FIREBASE_AUTH_DOMAIN` | Your Firebase Auth Domain |
| `FIREBASE_PROJECT_ID` | Your Firebase Project ID |
| `FIREBASE_STORAGE_BUCKET` | Your Firebase Storage Bucket |
| `FIREBASE_MESSAGING_SENDER_ID` | Your Firebase Messaging Sender ID |
| `FIREBASE_APP_ID` | Your Firebase App ID |
| `FIREBASE_MEASUREMENT_ID` | Your Firebase Measurement ID |

### Getting Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (festamae-36e11)
3. Click the **gear icon** → **Project settings**
4. Scroll down to "Your apps"
5. Copy the values from your web app config

## 📦 Deployment

### Automatic Deployment (Recommended)

Once GitHub secrets are configured, the site automatically deploys when you:
- Push to `main` or `master` branch
- Modify files in the `FestaMagusto/` folder

The workflow:
1. Checks out your code
2. Installs dependencies
3. Builds the site with Vite (using secrets as environment variables)
4. Deploys to GitHub Pages

### Manual Deployment

```bash
npm run build
# Then manually upload the dist/ folder to your hosting
```

## 🏗️ Project Structure

```
FestaMagusto/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── script.js           # JavaScript logic
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── .env.example        # Example environment variables
├── .env                # Your local environment (git-ignored)
└── dist/               # Built files (git-ignored)
```

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Build Tool**: Vite
- **Database**: Firebase Firestore
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## ✨ Features

- 📱 Mobile-first responsive design
- 🛒 Real-time cart management
- 💰 Automatic ticket calculation
- 📊 Sales analytics with date/time filtering
- 🔥 Firebase integration for data persistence
- 🎨 Beautiful teal color scheme

## 🔒 Security Notes

- Environment variables are only used during build time
- The built files contain the actual API keys (this is normal for Firebase)
- Security is enforced through Firestore Security Rules
- Make sure to configure proper Firestore rules in Firebase Console

## 📝 Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the code:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

## 🐛 Troubleshooting

**Build fails in GitHub Actions:**
- Verify all secrets are added correctly
- Check secret names match exactly (case-sensitive)
- Ensure the workflow file is in `.github/workflows/`

**Firebase not working:**
- Check Firestore Security Rules
- Verify API key is correct
- Check browser console for errors

**Local development not working:**
- Make sure you created `.env` file
- Run `npm install` first
- Check that `.env` has all required variables

## 📄 License

MIT
