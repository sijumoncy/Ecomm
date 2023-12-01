import Joi from 'joi';

const addorder = {
  body: Joi.object().keys({
    orderItems: Joi.array().items(Joi.string()).required(),
    shippingAddress1: Joi.string().required(),
    shippingAddress2: Joi.string(),
    city: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
    totalPrice: Joi.number().required(),
    user: Joi.string().required(),
    color: Joi.string(),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    user: Joi.string(),
    status: Joi.string().valid("Pending" , "Processing" , "InTransit" , "Delivered"),
    dateOrdered: Joi.date(),
    dateDelivered: Joi.date(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getorder = {
  params: Joi.object().keys({
    orderId: Joi.string().required(),
  }),
};

const updateorder = {
  params: Joi.object().keys({
    orderId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      orderItems: Joi.array().items(Joi.string()),
      shippingAddress1: Joi.string(),
      shippingAddress2: Joi.string(),
      city: Joi.string(),
      zip: Joi.string(),
      country: Joi.string(),
      phone: Joi.string(),
      totalPrice: Joi.number(),
      user: Joi.string(),
      status: Joi.string().valid("Pending" , "Processing" , "InTransit" , "Delivered")
    })
    .min(1),
};

const deleteorder = {
  params: Joi.object().keys({
    orderId: Joi.string().required(),
  }),
};

export { addorder, getorder, getOrders, deleteorder, updateorder };
