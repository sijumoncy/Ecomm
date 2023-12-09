import httpStatus from 'http-status';
import ApiError from '../utils/apiError';
import { pickKeyValues } from '../utils/pickKeyValues';
import { Request, Response } from 'express';
import {
  createCartService,
  deleteCartByIdService,
  getCartByIdService,
  getCartsService,
  updateCartByIdService
} from '../services/cartService';
import { IAuthRequest } from '../types/authTypes';

const addCartController = async (req: Request, res: Response) => {
  const order = await createCartService(req.body);
  res
    .status(httpStatus.CREATED)
    .json({ message: 'cart created successfully', data: order });
};

const getCartsController = async (req: IAuthRequest, res: Response) => {
  const filter = pickKeyValues(req.query, ['user']);
  const options = pickKeyValues(req.query, ['limit', 'page']);
  const result = await getCartsService(filter, options, req);
  res.status(httpStatus.OK).send(result);
};

const getCartController = async (req: IAuthRequest, res: Response) => {
  const cart = await getCartByIdService(req.params.cartId, req);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cart not found');
  }
  res.send(cart);
};

const updateCartController = async (req: IAuthRequest, res: Response) => {
  const cart = await updateCartByIdService(req.params.cartId, req.body, req);
  res.status(httpStatus.OK).json({ message: 'cart updated successfully', data: cart });
};

const deleteCartController = async (req: Request, res: Response) => {
  const deletedCart = await deleteCartByIdService(req.params.cartId, req);
  res.status(httpStatus.OK).send(deletedCart);
};

export {
  addCartController,
  getCartsController,
  getCartController,
  updateCartController,
  deleteCartController,
};
