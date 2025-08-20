import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  uploadAvatar,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { uploadAvatar as uploadMiddleware, handleUploadError } from '../middleware/upload.js';
import {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
  validateForgotPassword,
  validateResetPassword
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/reset-password/:token', validateResetPassword, resetPassword);

// Protected routes
router.get('/me', authenticateToken, getMe);
router.put('/profile', authenticateToken, validateProfileUpdate, updateProfile);
router.post('/avatar', authenticateToken, uploadMiddleware, handleUploadError, uploadAvatar);

export default router;