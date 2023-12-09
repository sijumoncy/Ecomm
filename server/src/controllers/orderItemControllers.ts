import httpStatus from 'http-status';
import ApiError from '../utils/apiError';
import { pickKeyValues } from '../utils/pickKeyValues';
import { Request, Response } from 'express';
import {
  createOrderItemService,
  getOrderItemsService,
  getOrderItemByIdService,
  updateOrderItemByIdService,
  deleteOrderItemByIdService,
} from '../services/orderItemServices';
import { IAuthRequest } from '../types/authTypes';

const addOrderItemController = async (req: IAuthRequest, res: Response) => {
  const orderItem = await createOrderItemService(req);
  res
    .status(httpStatus.CREATED)
    .json({ message: 'orderItem created successfully', data: orderItem });
};

const getOrderItemsController = async (req: IAuthRequest, res: Response) => {
  const filter = pickKeyValues(req.query, ['productId']);
  const options = pickKeyValues(req.query, ['limit', 'page']);
  const result = await getOrderItemsService(filter, options, req);
  res.status(httpStatus.OK).send(result);
};

const getOrderItemController = async (req: IAuthRequest, res: Response) => {
  const orderItem = await getOrderItemByIdService(req.params.orderItemId, req);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'orderItem not found');
  }
  res.send(orderItem);
};

const updateOrderItemController = async (req: Request, res: Response) => {
  const orderItem = await updateOrderItemByIdService(req.params.orderItemId, req.body, req);
  res.status(httpStatus.OK).json({ message: 'orderItem updated successfully', data: orderItem });
};

const deleteOrderItemController = async (req: Request, res: Response) => {
  const deletedOrderItem = await deleteOrderItemByIdService(req.params.orderItemId, req);
  res.status(httpStatus.OK).send(deletedOrderItem);
};

export {
  addOrderItemController,
  getOrderItemsController,
  getOrderItemController,
  updateOrderItemController,
  deleteOrderItemController,
};
