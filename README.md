# Category Management Dashboard

A full-stack e-commerce Category Management Dashboard built with React.js and Node.js. This application allows users to sign up, log in, and manage product categories with a modern, professional UI.

## 🚀 Tech Stack

### Frontend
- **React.js** (v18.2.0) - Functional components with hooks
- **React Router DOM** (v6.16.0) - Client-side routing
- **Axios** (v1.5.0) - HTTP client for API requests
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v4.18.2) - Web framework
- **SQLite3** (v5.1.6) - Lightweight database
- **JWT** (jsonwebtoken v9.0.2) - Authentication tokens
- **Bcryptjs** (v2.4.3) - Password hashing
- **Multer** (v1.4.5) - File upload handling

### Authentication
- JWT-based authentication with 7-day token expiration
- Session persistence using localStorage
- Protected routes with authentication middleware

## ✨ Features

### 1. Authentication
- ✅ User signup with name, email, and password
- ✅ User login with email and password
- ✅ JWT-based authentication
- ✅ Session persistence (token stored in localStorage)
- ✅ Protected routes (redirects to login if not authenticated)
- ✅ Password validation (minimum 6 characters)

### 2. Dashboard
- ✅ View all categories in a responsive grid layout
- ✅ Each category card displays:
  - Category image
  - Category name
  - Item count
- ✅ Professional sidebar navigation
- ✅ Header with search, notifications, and user profile
- ✅ Responsive design for mobile and desktop

### 3. Category Management
- ✅ **Add New Category**
  - Category name input
  - Item count input
  - Image upload (stored locally in server/uploads)
  - Image preview before submission
  - File size validation (max 5MB)
  
- ✅ **Edit Category**
  - Update category name
  - Update item count
  - Replace category image
  - Preserve existing image if not changed
  
- ✅ **Delete Category**
  - Confirmation dialog before deletion
  - Automatic image cleanup

### 4. UI/UX Features
- ✅ Clean and modern design matching the reference UI
- ✅ Responsive layout for all screen sizes
- ✅ Loading states
- ✅ Error handling and validation
- ✅ Smooth transitions and hover effects
- ✅ Modal dialogs for add/edit operations
- ✅ Image preview functionality

## 📁 Project Structure

```
category-management-dashboard/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Sidebar.js
│   │   │   ├── Header.js
│   │   │   ├── CategoryGrid.js
│   │   │   ├── CategoryCard.js
│   │   │   ├── AddCategoryModal.js
│   │   │   ├── EditCategoryModal.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/        # React Context
│   │   │   └── AuthContext.js
│   │   ├── pages/          # Page components
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Dashboard.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── database/
│   │   └── db.js          # Database initialization
│   ├── middleware/
│   │   └── auth.js        # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js        # Authentication routes
│   │   └── categories.js  # Category CRUD routes
│   ├── uploads/           # Uploaded images storage
│   └── index.js           # Server entry point
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd category-management-dashboard
```

### Step 2: Install Dependencies

Install both root and client dependencies:

```bash
# Install root dependencies (backend)
npm install

# Install client dependencies (frontend)
cd client
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install-all
```

### Step 3: Environment Setup

Create a `.env` file in the root directory (optional, defaults are provided):

```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

### Step 4: Run the Application

#### Option 1: Run Both Frontend and Backend Together
```bash
npm run dev
```

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### Categories (Protected - Requires JWT)
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create new category (with image upload)
- `PUT /api/categories/:id` - Update category (with optional image upload)
- `DELETE /api/categories/:id` - Delete category

### Health Check
- `GET /api/health` - Server health check

## 🔐 Authentication Flow

1. User signs up or logs in
2. Server returns JWT token
3. Token is stored in localStorage
4. Token is included in Authorization header for all API requests
5. Protected routes check for valid token
6. Token expires after 7 days (user must login again)

## 🎨 UI Features

### Dashboard Layout
- **Sidebar**: Fixed left navigation with menu items
- **Header**: Top bar with search, notifications, and user profile
- **Main Content**: Category grid with cards

### Category Cards
- Hover effects with edit/delete buttons
- Image display with fallback placeholders
- Responsive grid layout (3 columns on desktop, 2 on tablet, 1 on mobile)

### Modals
- Add Category modal with form validation
- Edit Category modal with pre-filled data
- Image preview before upload

## 🚢 Deployment

### Frontend (Vercel/Netlify)
1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `client/build` folder to Vercel or Netlify
3. Set environment variable `REACT_APP_API_URL` to your backend URL

### Backend (Render/Railway/Heroku)
1. Set environment variables:
   - `PORT` (usually auto-assigned)
   - `JWT_SECRET` (use a strong secret)
   - `NODE_ENV=production`
2. Deploy the server folder
3. Ensure the `uploads` directory is writable

## 🧪 Testing the Application

1. **Sign Up**: Create a new account
2. **Login**: Use your credentials to login
3. **View Categories**: See the default sample categories
4. **Add Category**: Click "+ Add Category" button
5. **Edit Category**: Hover over a category card and click edit
6. **Delete Category**: Hover over a category card and click delete

## 📸 Screenshots

### Login Page
- Clean login form with email and password fields
- Link to signup page

### Signup Page
- Registration form with name, email, and password
- Password validation

### Dashboard
- Grid layout of category cards
- Sidebar navigation
- Header with search and user profile
- Add Category button

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change PORT in `.env` or kill the process using the port

2. **Database errors**
   - Delete `server/database/database.sqlite` and restart the server

3. **Image upload fails**
   - Ensure `server/uploads` directory exists and is writable

4. **CORS errors**
   - Check that backend CORS is configured correctly
   - Verify API URL in frontend

5. **Authentication fails**
   - Clear localStorage and login again
   - Check JWT_SECRET is set correctly

## 📄 License

This project is created for educational purposes.

## 👤 Author

Category Management Dashboard - Full Stack E-commerce Platform

---

**Note**: This application uses SQLite for simplicity. For production use, consider migrating to PostgreSQL or MongoDB for better scalability.

