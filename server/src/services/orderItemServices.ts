import httpStatus from 'http-status';
import OrderItemModel, { OrderItemInterface } from '../models/OrderItem';
import ApiError from '../utils/apiError';

const createOrderItemService = async (OrderItemBody: OrderItemInterface) => {
  return OrderItemModel.create(OrderItemBody);
};

const getOrderItemsService = async (
  filter: Object,
  options: {
    limit?: number;
    page?: number;
  }
) => {
  const pageNum = (options.limit || 100) * (options.page || 0);
  const orderItem = await OrderItemModel.find({ filter })
    .limit(options.limit || 100)
    .skip(pageNum)
    .exec();
  return orderItem;
};

const getOrderItemByIdService = async (id: string) => {
  return OrderItemModel.findById(id);
};

const updateOrderItemByIdService = async (
  orderItemId: string,
  updateBody: {
    quantity?: number;
    product?: string;
  }
) => {
  const orderItem = await getOrderItemByIdService(orderItemId);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'OrderItem not found');
  }
  Object.assign(orderItem, updateBody);
  await orderItem.save();
  return orderItem;
};

const deleteOrderItemByIdService = async (userId: string) => {
  const deletedOrderItem = await OrderItemModel.findByIdAndDelete(userId);
  if (!deletedOrderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'OrderItem not found');
  }
  return deletedOrderItem;
};

export {
  createOrderItemService,
  getOrderItemsService,
  getOrderItemByIdService,
  updateOrderItemByIdService,
  deleteOrderItemByIdService,
};
