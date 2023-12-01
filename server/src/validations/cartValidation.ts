import Joi from 'joi';

const addCart = {
  body: Joi.object().keys({
    product: Joi.string().required(),
    user: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
};

const getCarts = {
  query: Joi.object().keys({
    user: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCart = {
  params: Joi.object().keys({
    CartId: Joi.string().required(),
  }),
};

const updateCart = {
  params: Joi.object().keys({
    CartId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      product: Joi.string(),
      user: Joi.string(),
      quantity: Joi.number(),
    })
    .min(1),
};

const deleteCart = {
  params: Joi.object().keys({
    CartId: Joi.string().required(),
  }),
};

export { addCart, getCart, getCarts, deleteCart, updateCart };
