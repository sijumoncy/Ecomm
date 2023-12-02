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

const router = express.Router();

router
  .route('/')
  .post(validate(createUser), createUserController)
  .get(validate(getUsers), getUsersController);

router
  .route('/:userId')
  .get(validate(getUser), getUserController)
  .patch(validate(updateUser), updateUserController)
  .delete(validate(deleteUser), deleteUserController);

export default router;
