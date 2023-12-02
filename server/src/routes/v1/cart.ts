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

const router = express.Router();

router
  .route('/')
  .post(validate(addCart), addCartController)
  .get(validate(getCarts), getCartsController);

router
  .route('/:cartId')
  .get(validate(getCart), getCartController)
  .patch(validate(updateCart), updateCartController)
  .delete(validate(deleteCart), deleteCartController);

export default router;
