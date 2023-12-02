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

const router = express.Router();

router
  .route('/')
  .post(validate(addCategory), addCategoryController)
  .get(validate(getCategories), getCategoriesController);

router
  .route('/:categoryId')
  .get(validate(getCategory), getCategoryController)
  .patch(validate(updateCategory), updateCategoryController)
  .delete(validate(deleteCategory), deleteCategoryController);

export default router;
