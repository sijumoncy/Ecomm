import httpStatus from 'http-status';
import CategoryModel, { CategoryInterface } from '../models/Category';
import ApiError from '../utils/apiError';

const createCategoryService = async (categoryBody: CategoryInterface) => {
  return CategoryModel.create(categoryBody);
};

const getCategoriesService = async (
  filter: Object,
  options: {
    limit?: number;
    page?: number;
  },
) => {
  const pageNum = (options.limit || 100) * (options.page || 0);
  const category = await CategoryModel.find({ filter })
    .limit(options.limit || 100)
    .skip(pageNum)
    .exec();
  return category;
};

const getCategoryByIdService = async (id: string) => {
  return CategoryModel.findById(id);
};

const updateCategoryByIdService = async (
  categoryId: string,
  updateBody: {
    name?: string;
    description?: string;
    icon?: string;
    color?: string;
  }
) => {
  const category = await getCategoryByIdService(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

const deleteCategoryByIdService = async (userId: string) => {
  const deletedCategory = await CategoryModel.findByIdAndDelete(userId);
    // check for related products of the category   
  if (!deletedCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }
  return deletedCategory;
};

export {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryByIdService,
  deleteCategoryByIdService,
};
