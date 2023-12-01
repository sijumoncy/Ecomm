import Joi, { string } from 'joi';

const addProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    richDescription: Joi.string(),
    category: Joi.string().required(),
    image: Joi.string(),
    images: Joi.array().items(Joi.string()),
    brand: Joi.string(),
    price: Joi.number(),
    stock: Joi.number(),
    rating: Joi.string(),
    numReviews: Joi.string(),
    isFeatured: Joi.boolean(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    category: Joi.string(),
    brand: Joi.string(),
    priceRange: Joi.object({
      min: Joi.number().default(0),
      max: Joi.number(),
    }),
    stock: Joi.object({
      min: Joi.number().default(0),
      max: Joi.number(),
    }),
    rating: Joi.number().default(0),
    isFeatured: Joi.boolean(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      richDescription: Joi.string(),
      category: Joi.string(),
      image: Joi.string(),
      images: Joi.array().items(Joi.string()),
      brand: Joi.string(),
      price: Joi.number(),
      stock: Joi.number(),
      rating: Joi.string(),
      numReviews: Joi.string(),
      isFeatured: Joi.boolean(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
};

export {
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct
}