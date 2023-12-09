import express from 'express';
import validate from '../../middlewares/validate';
import {
  addorder,
  deleteorder,
  getOrders,
  getorder,
  updateorder
} from '../../validations/orderValidation';
import {
  addOrderController,
  getOrderController,
  getOrdersController,
  deleteOrderController,
  updateOrderController
} from '../../controllers/orderControllers';
import {AdminOnlyAccess, authenticate } from '../../middlewares/authenticate';

const router = express.Router();

router
  .route('/')
  .post(authenticate, validate(addorder), addOrderController)
  .get(authenticate, validate(getOrders), getOrdersController);

router
  .route('/:orderId')
  .get(authenticate, validate(getorder), getOrderController)
  .patch(authenticate, validate(updateorder), updateOrderController)
  .delete(authenticate, AdminOnlyAccess, validate(deleteorder), deleteOrderController);

export default router;
