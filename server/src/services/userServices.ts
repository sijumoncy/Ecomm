import httpStatus from 'http-status';
import UserModel, { UserInterface } from '../models/User';
import ApiError from '../utils/apiError';
import {Schema} from 'mongoose';

const createUserService = async (userBody: UserInterface) => {
  if (await UserModel.isEmailExist(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return UserModel.create(userBody);
};

const getUsersService = async (
  filter: Object,
  options: {
    limit?: number;
    page?: number;
  }
) => {
  const pageNum = (options.limit || 100) * (options.page || 0);
  const users = await UserModel.find(filter)
    .limit(options.limit || 100)
    .skip(pageNum)
    .exec();
  return users;
};

const getUserByIdService = async (id:Schema.Types.ObjectId) => {
  const user = UserModel.findById(id);
  return user
};

const getUserByEmailService = async (email:string) => {
  return UserModel.findOne({ email });
};

const updateUserByIdService = async (userId:Schema.Types.ObjectId, updateBody:{
  name?: string
  email?: string
  password?: string
  phone?: string
  street?: string
  address?: string
  zip?: string
  city?: string
  country?: string
}) => {
  const user = await getUserByIdService(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await UserModel.isEmailExist(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserByIdService = async (userId:string) => {
  const deletedUser = await UserModel.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return deletedUser;
};

export {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
  getUserByEmailService
};
