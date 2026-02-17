# Fix MongoDB SSL Error on Render - Quick Steps

## The Problem
You're getting this error:
```
MongooseServerSelectionError: SSL routines:ssl3_read_bytes:tlsv1 alert internal error
ReplicaSetNoPrimary
```

This means MongoDB Atlas can't establish a secure TLS connection with Render.

## The Solution (3 Steps)

### Step 1: Update Your MongoDB Connection String in Render

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. **Select your service** (portfolio)
3. **Click "Environment"** tab (left sidebar)
4. **Find `MONGODB_URI`** variable
5. **Click the "Edit" button** (pencil icon)
6. **Replace the entire value** with:
   ```
   mongodb+srv://sid200519_db_user:Y4qbUFrjKQMFfmw2@portfolio.nzqs5cm.mongodb.net/?retryWrites=true&w=majority&tls=true&appName=Portfolio
   ```
7. **Click "Save Changes"** at the bottom

### Step 2: Whitelist Render in MongoDB Atlas

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Select your project** (Portfolio)
3. **Click "Network Access"** (left sidebar under Security)
4. **Click "Add IP Address"** button
5. **Select "Allow Access from Anywhere"** (or click it)
   - This adds `0.0.0.0/0` to the whitelist
6. **Click "Confirm"**
7. **Wait 2-3 minutes** for changes to take effect

### Step 3: Redeploy on Render

1. **Go back to Render** dashboard
2. **Go to your service** page
3. **Click "Manual Deploy"** button (top right)
4. **Select "Clear build cache & deploy"**
5. **Wait for deployment** to complete
6. **Check logs** - you should see: `✅ Connected to MongoDB successfully`

## Verification

After deployment, check the logs. You should see:
```
🚀 Starting server initialization...
Attempting MongoDB connection...
Environment: production
✅ Connected to MongoDB successfully
✅ App initialized successfully
Server is running on http://0.0.0.0:10000
```

## If It Still Fails

1. **Verify your MongoDB cluster is active**:
   - Go to MongoDB Atlas → Database → Clusters
   - Check status is "Active" (not paused)

2. **Double-check the connection string**:
   - Make sure username: `sid200519_db_user`
   - Make sure password: `Y4qbUFrjKQMFfmw2`
   - Make sure cluster: `portfolio.nzqs5cm.mongodb.net`

3. **Test connection locally**:
   ```bash
   npm run build
   npm start
   ```
   If it works locally, the issue is Render-specific.

## Need Help?

Check [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for complete troubleshooting guide.
