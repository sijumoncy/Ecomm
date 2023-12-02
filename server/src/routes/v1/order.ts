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

const router = express.Router();

router
  .route('/')
  .post(validate(addorder), addOrderController)
  .get(validate(getOrders), getOrdersController);

router
  .route('/:orderId')
  .get(validate(getorder), getOrderController)
  .patch(validate(updateorder), updateOrderController)
  .delete(validate(deleteorder), deleteOrderController);

export default router;
