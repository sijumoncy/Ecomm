import express from 'express';
import validate from '../../middlewares/validate';
import {
  forgotPassword,
  login,
  logout,
  refreshTokens,
  register,
  resetPassword,
} from '../../validations/authValidation';

import {forgotPasswordController, loginController, logoutController, refreshTokensController, registerController, resetPasswordController} from '../../controllers/authControllers'

const router = express.Router();

router.post('/register', validate(register), registerController);
router.post('/login', validate(login), loginController);
router.post('/logout', validate(logout), logoutController);
router.post('/refresh-token', validate(refreshTokens), refreshTokensController);
router.post('/forgot-password', validate(forgotPassword), forgotPasswordController);
router.post('/reset-password', validate(resetPassword), resetPasswordController);

export default router;
