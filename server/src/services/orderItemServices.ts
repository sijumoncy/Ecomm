import httpStatus from 'http-status';
import OrderItemModel, { OrderItemInterface } from '../models/OrderItem';
import ApiError from '../utils/apiError';
import { IAuthRequest } from '../types/authTypes';

const createOrderItemService = async (req: IAuthRequest) => {
  if(req.user) {
    return OrderItemModel.create({...req.body, user:req.user._id});
  }else{
    throw new ApiError(httpStatus.NOT_FOUND, 'authentication failed');
  }
};

const getOrderItemsService = async (
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
  const orderItem = await OrderItemModel.find({ filter })
    .limit(options.limit || 100)
    .skip(pageNum)
    .exec();
  return orderItem;
};

const getOrderItemByIdService = async (orderItemId: string, req:IAuthRequest) => {
  const filter:any = {_id:orderItemId }
  if(!req.user?.isAdmin) {
    filter.user = req.user?._id
  }
  return OrderItemModel.find(filter);
};

const updateOrderItemByIdService = async (
  orderItemId: string,
  updateBody: {
    quantity?: number;
    product?: string;
  },
  req:IAuthRequest
) => {
  const orderItem = await getOrderItemByIdService(orderItemId, req);
  if (!orderItem || !(orderItem.length > 0)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'OrderItem not found');
  }
  Object.assign(orderItem[0], updateBody);
  await orderItem[0].save();
  return orderItem[0];
};

const deleteOrderItemByIdService = async (orderId: string, req:IAuthRequest) => {
  let deletedOrderItem;
  if(req.user?.isAdmin){
    deletedOrderItem = await OrderItemModel.findByIdAndDelete(orderId);
  } else{
    deletedOrderItem = await OrderItemModel.find({_id:orderId, user:req.user?.id});
    deletedOrderItem = deletedOrderItem.length > 0 ? deletedOrderItem[0] : deletedOrderItem
  }
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
