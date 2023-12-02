import httpStatus from 'http-status';
import ApiError from '../utils/apiError';
import { pickKeyValues } from '../utils/pickKeyValues';
import { Request, Response } from 'express';
import {
  createProductService,
  getProductsService,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
} from '../services/productServices';

const addProductController = async (req: Request, res: Response) => {
  const product = await createProductService(req.body);
  res
    .status(httpStatus.CREATED)
    .json({ message: 'product created successfully', data: product });
};

const getProductsController = async (req: Request, res: Response) => {
  const filter = pickKeyValues(req.query, ['name', 'category', 'brand', 'rating', 'isFeatured']);
  const compareFilters = pickKeyValues(req.query, ['priceRange', 'stock']);
  const options = pickKeyValues(req.query, ['limit', 'page']);
  const result = await getProductsService(filter, options, compareFilters);
  res.status(httpStatus.OK).send(result);
};

const getProductController = async (req: Request, res: Response) => {
  const product = await getProductByIdService(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  res.send(product);
};

const updateProductController = async (req: Request, res: Response) => {
  const product = await updateProductByIdService(req.params.productId, req.body);
  res.status(httpStatus.OK).json({ message: 'product updated successfully', data: product });
};

const deleteProductController = async (req: Request, res: Response) => {
  const deletedProduct = await deleteProductByIdService(req.params.productId);
  res.status(httpStatus.OK).send(deletedProduct);
};

export {
  addProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
};
