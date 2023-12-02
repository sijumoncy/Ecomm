import httpStatus from 'http-status';
import ApiError from '../utils/apiError';
import { pickKeyValues } from '../utils/pickKeyValues';
import { Request, Response } from 'express';
import {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryByIdService,
  deleteCategoryByIdService,
} from '../services/CategoryServices';

const addCategoryController = async (req: Request, res: Response) => {
  const category = await createCategoryService(req.body);
  res
    .status(httpStatus.CREATED)
    .json({ message: 'category created successfully', data: category });
};

const getCategoriesController = async (req: Request, res: Response) => {
  const filter = pickKeyValues(req.query, ['name', 'icon', 'color']);
  const options = pickKeyValues(req.query, ['limit', 'page']);
  const result = await getCategoriesService(filter, options);
  res.status(httpStatus.OK).send(result);
};

const getCategoryController = async (req: Request, res: Response) => {
  const category = await getCategoryByIdService(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }
  res.send(category);
};

const updateCategoryController = async (req: Request, res: Response) => {
  const category = await updateCategoryByIdService(req.params.categoryId, req.body);
  res.status(httpStatus.OK).json({ message: 'category updated successfully', data: category });
};

const deleteCategoryController = async (req: Request, res: Response) => {
  const deletedCategory = await deleteCategoryByIdService(req.params.categoryId);
  res.status(httpStatus.OK).send(deletedCategory);
};

export {
  addCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
