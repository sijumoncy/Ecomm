import express from 'express';
import validate from '../../middlewares/validate';
import {
  addCart,
  deleteCart,
  getCart,
  getCarts,
  updateCart
} from '../../validations/cartValidation';
import {
  addCartController,
  deleteCartController,
  getCartController,
  getCartsController,
  updateCartController
} from '../../controllers/cartControllers';
import { authenticate } from '../../middlewares/authenticate';

const router = express.Router();

router
  .route('/')
  .post(authenticate, validate(addCart), addCartController)
  .get(authenticate, validate(getCarts), getCartsController);

router
  .route('/:cartId')
  .get(authenticate, validate(getCart), getCartController)
  .patch(authenticate, validate(updateCart), updateCartController)
  .delete(authenticate, validate(deleteCart), deleteCartController);

export default router;
