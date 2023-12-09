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
import { AdminOnlyAccess, authenticate } from '../../middlewares/authenticate';

const router = express.Router();

router
  .route('/')
  .post(authenticate, validate(addorderItem), addOrderItemController)
  .get(authenticate, validate(getorderItems), getOrderItemsController);

router
  .route('/:orderItemId')
  .get(authenticate, validate(getorderItem), getOrderItemController)
  .patch(authenticate, AdminOnlyAccess, validate(updateorderItem), updateOrderItemController)
  .delete(authenticate, validate(deleteorderItem), deleteOrderItemController);

export default router;
