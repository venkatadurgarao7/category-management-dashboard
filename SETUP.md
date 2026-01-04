# Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher) installed
- npm or yarn package manager

## Installation Steps

1. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

2. **Start Development Server**
   ```bash
   # Run both frontend and backend
   npm run dev
   ```
   
   Or run separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

4. **First Time Setup**
   - Open http://localhost:3000
   - Click "Sign up" to create an account
   - Login with your credentials
   - You'll see sample categories pre-loaded

## Default Sample Data

The application comes with 9 sample categories:
- Men Clothes (24 items)
- Women Clothes (12 items)
- Accessories (43 items)
- Cotton Clothes (31 items)
- Summer Clothes (26 items)
- Wedding Clothes (52 items)
- Spring Collection (24 items)
- Casual Clothes (52 items)
- Hats (26 items)

## Troubleshooting

- **Port 3000 or 5000 already in use**: Change the port in package.json scripts or kill the process
- **Database errors**: Delete `server/database/database.sqlite` and restart
- **Module not found**: Run `npm install` in both root and client directories


