# ZenYukti MERN Authentication System

This project contains a complete MERN stack authentication system with the following features:

## Features

- **User Authentication**: Login/Signup with JWT tokens
- **Profile Management**: Edit user profile with real-time updates
- **Avatar Upload**: Upload and manage profile pictures
- **Password Recovery**: Forgot password functionality
- **Secure Backend**: MongoDB + Express.js with security middleware
- **Modern Frontend**: React + TypeScript + Tailwind CSS

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/avinash-394/website.git
   cd website
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   npm run install-backend
   ```

3. **Set up environment variables**
   
   **Frontend (.env):**
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```
   
   **Backend (backend/.env):**
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/zenyukti
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=uploads
   ```

4. **Start the application**
   ```bash
   # Run both frontend and backend
   npm run full-dev
   
   # OR run separately:
   # Backend only
   npm run backend
   
   # Frontend only (in another terminal)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/zenyukti`

### Option 2: MongoDB Atlas (Recommended for deployment)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `MONGODB_URI` in backend/.env with your Atlas connection string

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update profile (requires auth)
- `POST /api/auth/avatar` - Upload avatar (requires auth)
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password/:token` - Reset password

### Health Check
- `GET /api/health` - API health status

## Project Structure

```
website/
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── contexts/          # React contexts (Auth)
│   ├── lib/               # Utilities and API calls
│   ├── pages/             # Page components
│   └── ...
├── backend/               # Express.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   └── server.js      # Main server file
│   └── uploads/           # Uploaded files (avatars)
└── ...
```

## Deployment

### Production Environment Variables

**Backend:**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret_very_long_and_secure
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend:**
```env
VITE_API_BASE_URL=https://your-api-domain.com
```

### Deploy to Vercel/Netlify (Frontend) + Railway/Heroku (Backend)

1. **Deploy Backend:**
   - Push `backend/` directory to a separate repository or branch
   - Deploy to Railway, Heroku, or similar service
   - Set environment variables in the hosting platform

2. **Deploy Frontend:**
   - Update `VITE_API_BASE_URL` to your backend URL
   - Deploy to Vercel, Netlify, or similar service

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- CORS protection
- Helmet security headers
- File upload validation
- Input validation and sanitization

## Testing the Authentication

1. **Register a new user** at `/signup`
2. **Login** at `/login` 
3. **Access profile** at `/profile`
4. **Upload avatar** by clicking the camera icon
5. **Test password recovery** at `/forgot-password`

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- React Hook Form + Zod validation
- React Router DOM

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- Multer (file uploads)
- bcryptjs (password hashing)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details