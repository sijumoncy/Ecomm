import express from 'express';
import validate from '../../middlewares/validate';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../../validations/userValidation';
import {
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from '../../controllers/userController';
import { AdminOnlyAccess, authenticate, checkPermissionAdminOrSameUserReq } from '../../middlewares/authenticate';

const router = express.Router();

router
  .route('/')
  .post(authenticate, validate(createUser), createUserController)
  .get(authenticate, AdminOnlyAccess, validate(getUsers), getUsersController);

router
  .route('/:userId')
  .get(authenticate, checkPermissionAdminOrSameUserReq, validate(getUser), getUserController)
  .patch(authenticate, checkPermissionAdminOrSameUserReq, validate(updateUser), updateUserController)
  .delete(authenticate, AdminOnlyAccess, validate(deleteUser), deleteUserController);

export default router;
