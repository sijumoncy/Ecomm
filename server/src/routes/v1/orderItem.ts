import express from 'express';
import validate from '../../middlewares/validate';
import {
  addorderItem,
  getorderItem,
  getorderItems,
  updateorderItem,
  deleteorderItem,
} from '../../validations/orderItemValidation';
import {
  addOrderItemController,
  deleteOrderItemController,
  getOrderItemController,
  getOrderItemsController,
  updateOrderItemController,
} from '../../controllers/orderItemControllers';

const router = express.Router();

router
  .route('/')
  .post(validate(addorderItem), addOrderItemController)
  .get(validate(getorderItems), getOrderItemsController);

router
  .route('/:productId')
  .get(validate(getorderItem), getOrderItemController)
  .patch(validate(updateorderItem), updateOrderItemController)
  .delete(validate(deleteorderItem), deleteOrderItemController);

export default router;
