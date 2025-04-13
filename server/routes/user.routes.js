import { Router } from 'express';
import { register, login, logout, getProfile ,forgotPassword,resetPassword, changePassword, updateUser} from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

// Route to register a new user
router.post('/register',upload.single("avatar"), register);

// Route to login a user
router.post('/login', login);

// Route to logout a user
router.get('/logout', logout);

// Route to get the profile of the currently logged-in user
// Requires authentication
router.get('/me', isLoggedIn, getProfile);

router.post('/reset', forgotPassword);
router.post('/reset/:resetToken',resetPassword);
router.post('/change-password',isLoggedIn, changePassword)
router.put("/update/:id",isLoggedIn, upload.single("avatar"), updateUser)

export default router;
