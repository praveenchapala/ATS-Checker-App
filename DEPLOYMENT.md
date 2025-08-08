# 🚀 Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED

#### Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend:**
   ```bash
   cd client
   vercel
   ```

3. **Configure Environment Variables in Vercel Dashboard:**
   - `REACT_APP_API_URL` = `https://your-backend-url.railway.app`

#### Backend Deployment (Railway)

1. **Go to [Railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Select the `server` folder**
4. **Set Environment Variables:**
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = `https://your-frontend-url.vercel.app`

### Option 2: Heroku (Full Stack)

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku App:**
   ```bash
   heroku create your-ats-checker-app
   ```

4. **Set Buildpacks:**
   ```bash
   heroku buildpacks:set heroku/nodejs
   heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-static
   ```

5. **Deploy:**
   ```bash
   git push heroku master
   ```

### Option 3: Netlify (Frontend) + Render (Backend)

#### Frontend (Netlify)

1. **Build the project:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify:**
   - Drag and drop the `build` folder to Netlify
   - Or connect GitHub repository

#### Backend (Render)

1. **Go to [Render.com](https://render.com)**
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Set the root directory to `server`**
5. **Set Environment Variables:**
   - `PORT` = `5000`
   - `NODE_ENV` = `production`

## Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
```

## Important Notes

1. **File Uploads:** The app uses local file storage. For production, consider using:
   - AWS S3
   - Cloudinary
   - Firebase Storage

2. **CORS Configuration:** Update CORS settings in `server/index.js` for your production domains

3. **Environment Variables:** Always use environment variables for sensitive data

4. **Build Process:** The frontend needs to be built before deployment

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Update CORS origin in backend
   - Check environment variables

2. **File Upload Issues:**
   - Ensure upload directory exists
   - Check file size limits

3. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

## Cost Estimates

- **Vercel:** Free tier available
- **Railway:** $5/month for basic plan
- **Heroku:** $7/month for basic dyno
- **Netlify:** Free tier available
- **Render:** Free tier available

## Recommended Stack for Production

1. **Frontend:** Vercel or Netlify
2. **Backend:** Railway or Render
3. **Database:** MongoDB Atlas (if needed)
4. **File Storage:** AWS S3 or Cloudinary
5. **Domain:** Custom domain (optional)
