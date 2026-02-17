# Vercel Deployment Guide

## Overview
This guide will help you deploy your portfolio to Vercel with MongoDB backend.

## Prerequisites
- Vercel account (https://vercel.com)
- MongoDB Atlas cluster (see [MONGODB_SETUP.md](MONGODB_SETUP.md))
- GitHub repository connected to Vercel

## Environment Variables Required

Before deploying, you need to set up these environment variables in Vercel:

### Required Variables

1. **MONGODB_URI**
   - Your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`
   - Get from MongoDB Atlas

2. **NODE_ENV**
   - Set to: `production`

### Optional Variables

3. **GITHUB_TOKEN**
   - Your GitHub Personal Access Token
   - For displaying contribution graph
   - See [GITHUB_SETUP.md](GITHUB_SETUP.md) for setup

4. **GITHUB_USERNAME**
   - Your GitHub username
   - Example: `Sid-dev01`

## Deployment Steps

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 2: Install Dependencies Locally

```bash
npm install
```

This will install `@vercel/node` which is required for serverless functions.

### Step 3: Configure Environment Variables in Vercel

#### Via Vercel Dashboard:

1. Go to your project on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/...
NODE_ENV = production
GITHUB_TOKEN = github_pat_XXXX...
GITHUB_USERNAME = your_github_username
```

4. Select which environments (Production, Preview, Development)
5. Click **Save**

#### Via Vercel CLI:

```bash
vercel env add MONGODB_URI
# Paste your MongoDB URI when prompted

vercel env add NODE_ENV
# Enter: production

vercel env add GITHUB_TOKEN
# Paste your GitHub token

vercel env add GITHUB_USERNAME
# Enter your GitHub username
```

### Step 4: Deploy to Vercel

#### Deploy via Git (Recommended):

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Setup Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Configure Build Settings** (if needed):
   - **Build Command**: `npm run build` (auto-detected from package.json)
   - **Output Directory**: `dist/public` (auto-detected from vercel.json)
   - **Install Command**: `npm install`

4. **Deploy**:
   - Click **Deploy**
   - Wait for the build to complete

#### Deploy via CLI:

```bash
# First time
vercel

# Follow prompts
# Select scope, link to existing project or create new

# For production deployment
vercel --prod
```

### Step 5: Verify Deployment

After deployment, test these endpoints:

1. **Homepage**: `https://your-app.vercel.app/`
2. **API - Jobs**: `https://your-app.vercel.app/api/jobs`
3. **API - Projects**: `https://your-app.vercel.app/api/projects`
4. **API - Skills**: `https://your-app.vercel.app/api/skills`
5. **API - GitHub**: `https://your-app.vercel.app/api/github-contributions`

## Project Structure for Vercel

```
Portfolio V2/
├── api/                    # Vercel serverless functions
│   └── index.ts           # API handler (routes all /api/* requests)
├── server/                # Express backend
│   ├── index.ts          # Main server file (exports app)
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database operations
│   └── db.ts             # MongoDB connection
├── client/               # React frontend
│   └── src/             # React components
├── dist/                # Build output (created during build)
│   ├── public/          # Static frontend files
│   └── index.cjs        # Compiled server (not used by Vercel)
├── package.json         # Dependencies and scripts
├── vercel.json          # Vercel configuration
└── vite.config.ts       # Vite configuration

```

## How Vercel Deployment Works

### Build Process

1. **Runs**: `npm run build` (which executes `tsx script/build.ts`)
2. **Builds Frontend**: Vite builds React app to `dist/public`
3. **Builds Backend**: ESBuild compiles server to `dist/index.cjs`
4. **Output**: Static files in `dist/public` + Serverless function in `api/index.ts`

### Request Routing

```
Request to /          → dist/public/index.html (Static)
Request to /api/jobs → api/index.ts → Express App → Routes
```

### Serverless Function (api/index.ts)

- Initializes Express app once (cached)
- Handles all `/api/*` requests
- Connects to MongoDB
- Returns JSON responses

## Troubleshooting

### Build Fails

**Error**: "Cannot find module 'mongoose'"

**Solution**: 
```bash
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Database Connection Issues

**Error**: "MONGODB_URI must be set"

**Solution**:
- Verify environment variables in Vercel dashboard
- Check that `MONGODB_URI` is set for Production environment
- Redeploy after adding variables

### API Routes Not Working

**Error**: 404 on API endpoints

**Solution**:
1. Check `vercel.json` configuration
2. Verify `api/index.ts` exists
3. Check deployment logs in Vercel dashboard

### Static Files Not Loading

**Error**: White screen or 404 for assets

**Solution**:
1. Verify build completed successfully
2. Check `dist/public` folder is created locally: `npm run build`
3. Check Vercel build logs for errors

### GitHub Contributions Not Showing

**Error**: "GitHub token not configured"

**Solution**:
1. Add `GITHUB_TOKEN` to Vercel environment variables
2. Add `GITHUB_USERNAME` to Vercel environment variables
3. Redeploy the application

## Monitoring

### View Logs

1. Go to your project in Vercel Dashboard
2. Click **Deployments**
3. Click on a deployment
4. View **Build Logs** and **Function Logs**

### Check Function Performance

- Navigate to **Analytics** in Vercel Dashboard
- View function execution time, errors, and usage

## Custom Domain (Optional)

### Add Custom Domain:

1. Go to **Settings** → **Domains**
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

## Continuous Deployment

Every push to your main branch will automatically:
1. Trigger a new build
2. Run tests (if configured)
3. Deploy to production (if all checks pass)

### Preview Deployments

- Every PR creates a preview deployment
- Test changes before merging
- Unique URL for each preview

## Performance Optimization

### Already Configured:

- ✅ Static file serving from CDN
- ✅ Automatic compression
- ✅ Edge network distribution
- ✅ Serverless function optimization
- ✅ Code splitting (Vite)

### Recommendations:

- Use environment-specific MongoDB clusters
- Enable caching for GitHub API calls (already implemented)
- Monitor function cold starts

## Security Checklist

- [ ] All environment variables set in Vercel (not in code)
- [ ] MongoDB connection string uses strong password
- [ ] MongoDB Atlas has IP whitelist configured
- [ ] GitHub token has minimal required scopes
- [ ] HTTPS enforced (automatic with Vercel)

## Cost Considerations

### Vercel Free Tier Includes:
- Unlimited deployments
- 100 GB bandwidth per month
- Serverless function executions (100 GB-hours)
- Auto SSL certificates

### MongoDB Atlas Free Tier (M0):
- 512 MB storage
- Shared RAM
- No credit card required

## Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel CLI Reference**: https://vercel.com/docs/cli
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/

## Quick Command Reference

```bash
# Local development
npm run dev

# Build locally
npm run build

# Deploy to Vercel
vercel --prod

# View deployment logs
vercel logs

# List deployments
vercel ls

# Set environment variable
vercel env add VARIABLE_NAME

# Pull environment variables locally
vercel env pull
```

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] API endpoints return data
- [ ] GitHub contributions display
- [ ] MongoDB connection successful
- [ ] Custom domain configured (if applicable)
- [ ] Environment variables set
- [ ] Build logs reviewed
- [ ] No console errors in browser

---

**Your portfolio is now live on Vercel! 🎉**

Access it at: `https://your-project-name.vercel.app`
