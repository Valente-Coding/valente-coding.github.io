# Firebase Setup Guide

## 🔥 Firebase Implementation Complete!

Your product manager now has full Firebase integration for tracking sales and analytics.

## 📊 What Gets Saved

### 1. **Individual Carts** (Collection: `carts`)
Each time you click "Save Cart", a new document is created with:
- Timestamp
- Total amount
- Total items
- Full list of items with quantities and prices

### 2. **Product Statistics** (Collection: `products`)
For each product, tracks:
- Total quantity sold
- Total revenue generated
- First and last sale timestamps
- Product details (name, icon, price)

### 3. **Daily Summary** (Collection: `dailySummary`)
Aggregated daily stats:
- Total sales for the day
- Number of transactions
- Total items sold
- Last update timestamp

## 🚀 Setup Instructions

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name (e.g., "FestaMagusto")
4. Follow the setup wizard

### Step 2: Enable Firestore Database
1. In your Firebase project, click "Firestore Database" in the left menu
2. Click "Create database"
3. Choose "Start in production mode" or "Test mode"
4. Select your region (choose closest to Portugal)

### Step 3: Get Your Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app
5. Copy the `firebaseConfig` object

### Step 4: Update Your Code
Open `index.html` and replace this section:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

With your actual Firebase config values.

### Step 5: Set Firestore Rules (Important!)
In Firebase Console > Firestore Database > Rules, add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to carts collection
    match /carts/{cartId} {
      allow read, write: if true;
    }
    
    // Allow read/write to products collection
    match /products/{productId} {
      allow read, write: if true;
    }
    
    // Allow read/write to daily summary
    match /dailySummary/{date} {
      allow read, write: if true;
    }
  }
}
```

**Note:** These rules allow public access. For production, implement proper authentication!

## 📱 How to Use

1. **Add items to cart** - Tap products to add them
2. **Review cart** - Swipe left to see cart details
3. **Click "Save Cart"** button (💾 icon) - Saves transaction to Firebase
4. **Cart clears automatically** after successful save

## 📈 Viewing Your Data

### In Firebase Console:
1. Go to Firestore Database
2. Browse collections:
   - `carts` - All transactions
   - `products` - Sales by product
   - `dailySummary` - Daily totals

### Example Queries (in Firebase Console):

**Top selling products:**
- Go to `products` collection
- Sort by `totalQuantitySold` descending

**Today's sales:**
- Go to `dailySummary` collection
- Find document with today's date (YYYY-MM-DD)

**Recent transactions:**
- Go to `carts` collection
- Sort by `timestamp` descending

## 🛡️ Security Recommendations

For production use, implement:
1. **Firebase Authentication** - Require login to save carts
2. **Firestore Security Rules** - Restrict access based on user roles
3. **Data validation** - Validate data on the server side
4. **Backup strategy** - Enable automatic backups in Firebase

## 🔧 Troubleshooting

**Error: "Firebase is not initialized"**
- Check that your Firebase config is correct in `index.html`
- Make sure you're connected to the internet

**Error: "Missing or insufficient permissions"**
- Update your Firestore security rules as shown above

**Data not showing up:**
- Check browser console for errors
- Verify Firestore is enabled in Firebase Console
- Check that you've published your security rules

## 📊 Future Enhancements

Consider adding:
- User authentication for multiple vendors
- Real-time dashboard for live sales monitoring
- Export to CSV/Excel for accounting
- Inventory management
- Receipt printing
- Multiple payment methods tracking

## 💡 Tips

- Test with a few transactions first
- Monitor your Firebase usage in the console
- Set up billing alerts to avoid surprise charges
- The free tier is generous for small events!

---

**Need help?** Check the [Firebase Documentation](https://firebase.google.com/docs/firestore)
