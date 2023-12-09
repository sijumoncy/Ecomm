import httpStatus from 'http-status';
import OrderModel, { OrderInterface } from '../models/Order';
import ApiError from '../utils/apiError';
import { OrderStatusType } from '../types/commonTypes';
import { IAuthRequest } from '../types/authTypes';

const createOrderService = async (OrderBody: OrderInterface) => {
  return OrderModel.create(OrderBody);
};

const getOrdersService = async (
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
  const order = await OrderModel.find({ filter })
    .limit(options.limit || 100)
    .skip(pageNum)
    .exec();
  return order;
};

const getOrderByIdService = async (orderId: string, req:IAuthRequest) => {
  const filter:any = {_id:orderId }
  if(!req.user?.isAdmin) {
    filter.user = req.user?._id
  }
  return OrderModel.find(filter);
};

const updateOrderByIdService = async (
  orderId: string,
  updateBody: {
    user?: string;
    status?: OrderStatusType;
    dateOrdered?:Date;
    dateDelivered?:Date;
  },
  req:IAuthRequest
) => {
  const order:any = await getOrderByIdService(orderId, req);
  if (!order || (order.length !== 1)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order[0], updateBody);
  await order[0].save();
  return order[0];
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
