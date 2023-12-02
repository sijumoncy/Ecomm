import httpStatus from 'http-status';
import OrderModel, { OrderInterface } from '../models/Order';
import ApiError from '../utils/apiError';
import { OrderStatusType } from '../types/commonTypes';

const createOrderService = async (OrderBody: OrderInterface) => {
  return OrderModel.create(OrderBody);
};

const getOrdersService = async (
  filter: Object,
  options: {
    limit?: number;
    page?: number;
  }
) => {
  const pageNum = (options.limit || 100) * (options.page || 0);
  const order = await OrderModel.find({ filter })
    .limit(options.limit || 100)
    .skip(pageNum)
    .exec();
  return order;
};

const getOrderByIdService = async (id: string) => {
  return OrderModel.findById(id);
};

const updateOrderByIdService = async (
  orderId: string,
  updateBody: {
    user?: string;
    status?: OrderStatusType;
    dateOrdered?:Date;
    dateDelivered?:Date;
  }
) => {
  const order = await getOrderByIdService(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

const deleteOrderByIdService = async (userId: string) => {
  const deletedOrder = await OrderModel.findByIdAndDelete(userId);
  if (!deletedOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return deletedOrder;
};

export {
  createOrderService,
  getOrdersService,
  getOrderByIdService,
  updateOrderByIdService,
  deleteOrderByIdService,
};
