import httpStatus from 'http-status';
import ProductModel, { ProductInterface } from '../models/Product';
import {generateMinMaxDbQuery} from '../utils/generateMinMaxDbQuery'
import ApiError from '../utils/apiError';

const createProductService = async (userBody: ProductInterface) => {
  return ProductModel.create(userBody);
};

const getProductsService = async (
  filter: Object,
  options: {
    limit?: number;
    page?: number;
  },
  compareFilters:{priceRange?:{min:number, max:number}, stock?:{min:number, max:number}}
) => {
  const pageNum = (options.limit || 100) * (options.page || 0);
  const compareQry =  generateMinMaxDbQuery(compareFilters)
  const products = await ProductModel.find({filter, ...compareQry})
    .limit(options.limit || 100)
    .skip(pageNum)
    .exec();
  return products;
};

const getProductByIdService = async (id: string) => {
  return ProductModel.findById(id);
};

const updateProductByIdService = async (
  userId: string,
  updateBody: {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    street?: string;
    address?: string;
    zip?: string;
    city?: string;
    country?: string;
  }
) => {
  const product = await getProductByIdService(userId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

const deleteProductByIdService = async (userId: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(userId);
  if (!deletedProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  return deletedProduct;
};

export {
  createProductService,
  getProductsService,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
};
