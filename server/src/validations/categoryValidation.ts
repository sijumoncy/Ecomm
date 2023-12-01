import Joi, { string } from 'joi';

const addCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    icon: Joi.string(),
    color: Joi.string(),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    icon: Joi.string(),
    color: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      icon: Joi.string(),
      color: Joi.string()
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

export {
  addCategory,
  getCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
