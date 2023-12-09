import express from 'express';
import validate from '../../middlewares/validate';
import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../../validations/productValidation';
import {
  addProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} from '../../controllers/productController';
import { AdminOnlyAccess, authenticate } from '../../middlewares/authenticate';

const router = express.Router();

router
  .route('/')
  .post(authenticate, validate(addProduct), addProductController)
  .get(validate(getProducts), getProductsController);

router
  .route('/:productId')
  .get(validate(getProduct), getProductController)
  .patch(authenticate, AdminOnlyAccess, validate(updateProduct), updateProductController)
  .delete(authenticate, AdminOnlyAccess, validate(deleteProduct), deleteProductController);

export default router;
