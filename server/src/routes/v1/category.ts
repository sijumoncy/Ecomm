import express from 'express';
import validate from '../../middlewares/validate';
import {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from '../../validations/categoryValidation';
import {
  addCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from '../../controllers/categoryControllers';
import { AdminOnlyAccess, authenticate } from '../../middlewares/authenticate';

const router = express.Router();

router
  .route('/')
  .post(authenticate, AdminOnlyAccess, validate(addCategory), addCategoryController)
  .get(validate(getCategories), getCategoriesController);

router
  .route('/:categoryId')
  .get(validate(getCategory), getCategoryController)
  .patch(authenticate, AdminOnlyAccess, validate(updateCategory), updateCategoryController)
  .delete(authenticate, AdminOnlyAccess, validate(deleteCategory), deleteCategoryController);

export default router;
