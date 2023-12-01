import Joi, { string } from 'joi';

const addorderItem = {
  body: Joi.object().keys({
    quantity: Joi.number().required(),
    product: Joi.string().required(),
  }),
};

const getorderItems = {
  query: Joi.object().keys({
    productId: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getorderItem = {
  params: Joi.object().keys({
    orderItemId: Joi.string().required(),
  }),
};

const updateorderItem = {
  params: Joi.object().keys({
    orderItemId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      quantity: Joi.string(),
      product: Joi.string(),
    })
    .min(1),
};

const deleteorderItem = {
  params: Joi.object().keys({
    orderItemId: Joi.string().required(),
  }),
};

export {
  addorderItem,
  getorderItem,
  getorderItems,
  deleteorderItem,
  updateorderItem,
};
