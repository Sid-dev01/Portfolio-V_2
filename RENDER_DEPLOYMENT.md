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
     - Example: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`
   
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token (optional, for contribution graph)
     - Create at: https://github.com/settings/tokens
     - Scopes needed: `read:user`, `repo` (for private repos)
   
   - `GITHUB_USERNAME`: Your GitHub username (optional, for contribution graph)
     - Example: `Sid-dev01`

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

**Solution**: 
1. Update your MongoDB connection string to include SSL parameters:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&tls=true
   ```
2. In Render dashboard, update the `MONGODB_URI` environment variable with the corrected string
3. Ensure your MongoDB Atlas cluster allows connections from `0.0.0.0/0` (Network Access whitelist)
4. Redeploy the service

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
