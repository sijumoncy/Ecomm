import httpStatus from 'http-status';
import CartModel, { CartInterface } from '../models/Cart';
import ApiError from '../utils/apiError';
import { OrderStatusType } from '../types/commonTypes';

const createCartService = async (CartBody: CartInterface) => {
  return CartModel.create(CartBody);
};

const getCartsService = async (
  filter: Object,
  options: {
    limit?: number;
    page?: number;
  }
) => {
  const pageNum = (options.limit || 100) * (options.page || 0);
  const order = await CartModel.find({ filter })
    .limit(options.limit || 100)
    .skip(pageNum)
    .exec();
  return order;
};

const getCartByIdService = async (id: string) => {
  return CartModel.findById(id);
};

const updateCartByIdService = async (
  cartId: string,
  updateBody: {
    product?: string;
    user?: OrderStatusType;
    quantity?:number;
  }
) => {
  const cart = await getCartByIdService(cartId);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cart not found');
  }
  Object.assign(cart, updateBody);
  await cart.save();
  return cart;
};

const deleteCartByIdService = async (cartId: string) => {
  const deletedCart = await CartModel.findByIdAndDelete(cartId);
  if (!deletedCart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cart not found');
  }
  return deletedCart;
};

export {
  createCartService,
  getCartsService,
  getCartByIdService,
  updateCartByIdService,
  deleteCartByIdService,
};
