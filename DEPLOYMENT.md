# Deployment Guide

## Frontend Deployment (Vercel/Netlify)

### Vercel Deployment

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Build the React app**:
   ```bash
   cd client
   npm run build
   ```

3. **Deploy**:
   - Option A: Use Vercel CLI
     ```bash
     vercel
     ```
   - Option B: Connect GitHub repo to Vercel dashboard
     - Go to vercel.com
     - Import your repository
     - Set root directory to `client`
     - Build command: `npm run build`
     - Output directory: `build`

4. **Environment Variables**:
   - Add `REACT_APP_API_URL` = your backend URL (e.g., `https://your-backend.onrender.com`)

### Netlify Deployment

1. **Build the React app**:
   ```bash
   cd client
   npm run build
   ```

2. **Deploy**:
   - Option A: Drag and drop the `client/build` folder to Netlify
   - Option B: Connect GitHub repo
     - Set base directory: `client`
     - Build command: `npm run build`
     - Publish directory: `client/build`

3. **Environment Variables**:
   - Add `REACT_APP_API_URL` = your backend URL

## Backend Deployment (Render/Railway)

### Render Deployment

1. **Create a new Web Service**:
   - Connect your GitHub repository
   - Set root directory to project root
   - Build command: `npm install`
   - Start command: `node server/index.js`

2. **Environment Variables**:
   ```
   PORT=10000 (or auto-assigned)
   JWT_SECRET=your-strong-secret-key-here
   NODE_ENV=production
   ```

3. **Important**:
   - Render provides a PostgreSQL database option (recommended for production)
   - For SQLite, ensure the database file persists (may need to use a volume)

### Railway Deployment

1. **Create a new project**:
   - Connect your GitHub repository
   - Railway will auto-detect Node.js

2. **Environment Variables**:
   ```
   PORT (auto-assigned)
   JWT_SECRET=your-strong-secret-key-here
   NODE_ENV=production
   ```

3. **Configure**:
   - Set start command: `node server/index.js`
   - Ensure `uploads` directory is writable

### Heroku Deployment

1. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**:
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

## Database Considerations

### SQLite (Current Setup)
- ✅ Simple for development
- ⚠️ Not ideal for production
- ⚠️ File-based, may not persist on some platforms

### Recommended for Production
- **PostgreSQL** (Render, Railway, Heroku)
- **MongoDB Atlas** (cloud-hosted)
- **MySQL** (various providers)

### Migration Steps (if needed)
1. Update database connection in `server/database/db.js`
2. Update schema creation queries
3. Test locally before deploying

## CORS Configuration

If frontend and backend are on different domains:

1. Update `server/index.js`:
   ```javascript
   app.use(cors({
     origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
     credentials: true
   }));
   ```

## File Upload Storage

### Current Setup (Local Storage)
- Files stored in `server/uploads/`
- May not persist on some platforms

### Recommended for Production
- **Cloud Storage**: AWS S3, Cloudinary, or similar
- **CDN**: For faster image delivery

### Cloudinary Example
1. Install: `npm install cloudinary multer-storage-cloudinary`
2. Configure in `server/routes/categories.js`
3. Update image URLs to use Cloudinary URLs

## Testing After Deployment

1. ✅ Test signup/login
2. ✅ Test viewing categories
3. ✅ Test adding category with image
4. ✅ Test editing category
5. ✅ Test deleting category
6. ✅ Test responsive design on mobile

## Troubleshooting

### Images not loading
- Check CORS settings
- Verify `REACT_APP_API_URL` is set correctly
- Check image URLs in database

### Authentication fails
- Verify JWT_SECRET is set
- Check token expiration
- Clear browser localStorage

### Database errors
- Check database connection
- Verify migrations ran
- Check file permissions

### Build errors
- Check Node.js version (should be 14+)
- Verify all dependencies installed
- Check for TypeScript errors (if using TS)

## Production Checklist

- [ ] Environment variables set
- [ ] CORS configured correctly
- [ ] Database connection working
- [ ] File uploads working
- [ ] HTTPS enabled
- [ ] Error logging configured
- [ ] Performance monitoring set up
- [ ] Backup strategy in place


