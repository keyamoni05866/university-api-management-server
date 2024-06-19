import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidation),
  AuthControllers.loginUser,
);
router.post(
  '/change-pass',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  validateRequest(AuthValidation.changePasswordValidation),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidation),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
