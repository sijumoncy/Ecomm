import httpStatus from 'http-status';
import CartModel, { CartInterface } from '../models/Cart';
import ApiError from '../utils/apiError';
import { OrderStatusType } from '../types/commonTypes';
import { IAuthRequest } from '../types/authTypes';

const createCartService = async (CartBody: CartInterface) => {
  return CartModel.create(CartBody);
};

const getCartsService = async (
  filter: Object,
  options: {
    limit?: number;
    page?: number;
  },
  req:IAuthRequest
) => {
  const pageNum = (options.limit || 100) * (options.page || 0);
  if(!req.user?.isAdmin){
    filter = {...filter, user:req.user?._id}
  }
  const order = await CartModel.find({ filter })
    .limit(options.limit || 100)
    .skip(pageNum)
    .exec();
  return order;
};

const getCartByIdService = async (cartId: string, req:IAuthRequest) => {
  const filter:any = {_id:cartId }
  if(!req.user?.isAdmin) {
    filter.user = req.user?._id
  }
  return CartModel.find(filter);
};

const updateCartByIdService = async (
  cartId: string,
  updateBody: {
    product?: string;
    user?: OrderStatusType;
    quantity?:number;
  },
  req:IAuthRequest
) => {
  const cart = await getCartByIdService(cartId, req);
  if (!cart || cart.length !== 1) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cart not found');
  }
  Object.assign(cart[0], updateBody);
  await cart[0].save();
  return cart[0];
};

const deleteCartByIdService = async (cartId: string, req:IAuthRequest) => {
  let deletedCart;
  if(req.user?.isAdmin){
    deletedCart = await CartModel.findByIdAndDelete(cartId);
  }else{
    deletedCart = await CartModel.find({_id:cartId, user:req.user?.id});
    deletedCart = deletedCart.length > 0 ? deletedCart[0] : deletedCart
  }
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
