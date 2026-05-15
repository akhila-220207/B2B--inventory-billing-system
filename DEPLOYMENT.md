# Vercel Deployment Guide

## Prerequisites
- Vercel account (create at https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)
- MongoDB Atlas account and connection string

## Deployment Steps

### 1. Connect Repository to Vercel
```bash
# Install Vercel CLI (optional)
npm install -g vercel

# Deploy from your project directory
vercel
```
Or connect your Git repository on Vercel dashboard:
- Go to https://vercel.com/dashboard
- Click "Add New" → "Project"
- Import your Git repository
- Select "B2B--inventory-billing-system"

### 2. Set Environment Variables in Vercel
In your Vercel project settings, go to **Settings** → **Environment Variables** and add:

```
MONGODB_URI = your_mongodb_atlas_connection_string
JWT_SECRET = your_secure_jwt_secret
RAZORPAY_KEY_ID = your_razorpay_key_id (if using payments)
RAZORPAY_KEY_SECRET = your_razorpay_key_secret (if using payments)
NODE_ENV = production
```

**How to get MongoDB URI:**
1. Go to MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
2. Select your database cluster
3. Click "Connect" → "Drivers"
4. Copy the connection string and replace `<password>` with your database password

### 3. Configure Build Settings
- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Install Command**: `npm install && cd backend && npm install`
- **Output Directory**: `build`

### 4. Deploy
```bash
# If using Vercel CLI
vercel --prod

# Or push to your Git repository
git push origin main
# Vercel will automatically deploy
```

### 5. Verify Deployment
- Frontend will be available at: `https://your-project.vercel.app`
- Backend API at: `https://your-project.vercel.app/api`
- Check logs in Vercel dashboard under "Deployments" → "Functions"

## Troubleshooting

### Database Connection Issues
- Ensure MongoDB Atlas allows Vercel IP ranges
- Go to MongoDB Atlas → Network Access
- Add IP address `0.0.0.0/0` (allows all IPs) or specific Vercel IPs

### CORS Issues
- The API already handles CORS for production
- Ensure environment variables are set correctly

### Build Failures
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json` and `backend/package.json`
- Run `npm run build` locally to test

## Production Checklist
- [ ] MongoDB URI set in environment variables
- [ ] JWT_SECRET set in environment variables
- [ ] Razorpay keys configured (if using payments)
- [ ] CORS origins configured in production
- [ ] Database backup strategy in place
- [ ] Error monitoring enabled (optional: Sentry, DataDog)
- [ ] API rate limiting configured (optional)

## Local Testing Before Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Test build locally
npm run build
cd backend && npm install

# Run production build locally
vercel dev
```

## Monitoring & Logs
Access logs in Vercel Dashboard:
- **Deployments**: View all deployment history
- **Functions**: Monitor serverless function performance
- **Analytics**: Track usage statistics
- **Monitoring**: Set up alerts for errors

## Useful Links
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Environment Variables: https://vercel.com/docs/environment-variables
