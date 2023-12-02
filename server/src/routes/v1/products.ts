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

const router = express.Router();

router
  .route('/')
  .post(validate(addProduct), addProductController)
  .get(validate(getProducts), getProductsController);

router
  .route('/:productId')
  .get(validate(getProduct), getProductController)
  .patch(validate(updateProduct), updateProductController)
  .delete(validate(deleteProduct), deleteProductController);

export default router;
