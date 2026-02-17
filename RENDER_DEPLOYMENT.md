# Deploying to Render

This application is configured to deploy on [Render](https://render.com/).

## Quick Deploy

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Render deployment"
   git push origin main
   ```

2. **Create a new Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml` and configure your service

3. **Set Environment Variables**
   
   In the Render dashboard, add these environment variables:
   
   - `MONGODB_URI`: Your MongoDB connection string (required)
     - **IMPORTANT**: Must include TLS parameters for production
     - **Correct format**: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&tls=true`
     - Example: `mongodb+srv://sid200519_db_user:Y4qbUFrjKQMFfmw2@portfolio.nzqs5cm.mongodb.net/?retryWrites=true&w=majority&tls=true&appName=Portfolio`
   
   - `NODE_ENV`: Set to `production` (will be auto-set by Render)
   
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token (optional, for contribution graph)
     - Create at: https://github.com/settings/tokens
     - Scopes needed: `read:user`, `repo` (for private repos)
   
   - `GITHUB_USERNAME`: Your GitHub username (optional, for contribution graph)
     - Example: `Sid-dev01`
   
   **⚠️ CRITICAL**: After setting environment variables, click "Save Changes" and manually trigger a redeploy!

4. **Deploy**
   - Render will automatically build and deploy your app
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

## Manual Configuration (if not using render.yaml)

If you prefer to configure manually instead of using `render.yaml`:

1. **Build Command**: `npm install && npm run build`
2. **Start Command**: `npm start`
3. **Environment**: `Node`
4. **Region**: Choose closest to your users
5. **Plan**: Free or Starter

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB database connection string |
| `GITHUB_TOKEN` | No | GitHub token for API rate limits |
| `GITHUB_USERNAME` | No | Your GitHub username for contributions |
| `NODE_ENV` | Auto-set | Automatically set to `production` |
| `PORT` | Auto-set | Automatically provided by Render |

## Build Details

- **Frontend**: Built with Vite to `dist/public/`
- **Backend**: Bundled with ESBuild to `dist/index.cjs`
- **Static Files**: Served from `dist/public/` in production
- **API Routes**: Handled by Express at `/api/*`

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Test production build locally
npm start
```

## Monitoring

- **Logs**: View in Render dashboard under "Logs" tab
- **Health Check**: Render pings `/` to ensure service is running
- **Auto-deploy**: Enabled by default on git push

## Custom Domain

1. Go to your service settings
2. Click "Add Custom Domain"
3. Follow DNS configuration instructions

## Troubleshooting

### SSL/TLS Alert Internal Error (MongooseServerSelectionError)
**Error**: `MongooseServerSelectionError: SSL routines:ssl3_read_bytes:tlsv1 alert internal error`
**Error**: `ReplicaSetNoPrimary` with servers like `ac-s0f6riy-shard-00-00.nzqs5cm.mongodb.net:27017`

**This error occurs when MongoDB Atlas TLS/SSL handshake fails. Follow these steps:**

**Step 1: Update MongoDB Connection String in Render**
1. Go to Render Dashboard → Your Service → Environment
2. Find the `MONGODB_URI` variable
3. Update it to include **required TLS parameters**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&tls=true&appName=Portfolio
   ```
4. Replace `username`, `password`, and `cluster` with your actual values
5. Click **Save Changes**
6. **Important**: Click **Manual Deploy** → **Deploy latest commit** to force redeploy

**Step 2: Configure MongoDB Atlas Network Access**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster → **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Select **Allow Access from Anywhere** (`0.0.0.0/0`)
   - Note: For production, you can restrict to Render's IP ranges instead
5. Click **Confirm**
6. Wait 2-3 minutes for changes to propagate

**Step 3: Verify Connection String Format**
- ✅ Correct: `mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority&tls=true`
- ❌ Wrong: `mongodb+srv://user:pass@cluster.mongodb.net/` (missing parameters)
- ❌ Wrong: `mongodb+srv://user:pass@cluster.mongodb.net/?appName=Portfolio` (missing tls=true)

**Step 4: Check MongoDB Atlas Cluster Status**
1. Go to MongoDB Atlas → Database → Clusters
2. Verify cluster status is "Active" (not paused or suspended)
3. Ensure cluster is not in M0 Free Tier maintenance mode

**Step 5: Redeploy on Render**
1. After making above changes, go to Render
2. Click **Manual Deploy** → **Clear build cache & deploy**
3. Watch the logs for "✅ Connected to MongoDB successfully"

### Build Fails
- Check that all environment variables are set
- Verify `MONGODB_URI` is accessible from Render's servers
- Review build logs in Render dashboard

### App Crashes on Start
- Ensure MongoDB connection string is valid
- Check that database allows connections from Render's IP ranges
- Review runtime logs

### Database Connection Issues
- **MongoDB Atlas Network Access**: Whitelist `0.0.0.0/0` in Network Access settings
  - Go to MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere
- **Connection String Format**: Must include `tls=true` parameter
  - Correct: `mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority&tls=true`
  - Incorrect: `mongodb+srv://user:pass@cluster.mongodb.net/` (missing parameters)
- **Test Connection**: Use MongoDB Compass or `mongosh` to verify connection string works
- **Timeout Issues**: Check `serverSelectionTimeoutMS` in connection options (default: 10000ms)

## Support

For issues with Render deployment, check:
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com/)
