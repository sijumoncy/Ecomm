import httpStatus from 'http-status';
import ApiError from '../utils/apiError';
import { pickKeyValues } from '../utils/pickKeyValues';
import { Request, Response } from 'express';
import {
  createOrderService,
  deleteOrderByIdService,
  getOrderByIdService,
  getOrdersService,
  updateOrderByIdService
} from '../services/ordersService';

const addOrderController = async (req: Request, res: Response) => {
  const order = await createOrderService(req.body);
  res
    .status(httpStatus.CREATED)
    .json({ message: 'Order created successfully', data: order });
};

const getOrdersController = async (req: Request, res: Response) => {
  const filter = pickKeyValues(req.query, ['user', 'status', 'dateOrdered', 'dateDelivered']);
  const options = pickKeyValues(req.query, ['limit', 'page']);
  const result = await getOrdersService(filter, options);
  res.status(httpStatus.OK).send(result);
};

const getOrderController = async (req: Request, res: Response) => {
  const order = await getOrderByIdService(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'order not found');
  }
  res.send(order);
};

const updateOrderController = async (req: Request, res: Response) => {
  const order = await updateOrderByIdService(req.params.orderId, req.body);
  res.status(httpStatus.OK).json({ message: 'order updated successfully', data: order });
};

const deleteOrderController = async (req: Request, res: Response) => {
  const deletedOrder = await deleteOrderByIdService(req.params.orderId);
  res.status(httpStatus.OK).send(deletedOrder);
};

export {
  addOrderController,
  getOrdersController,
  getOrderController,
  updateOrderController,
  deleteOrderController,
};
