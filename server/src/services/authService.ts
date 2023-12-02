import httpStatus from 'http-status';
import TokenModel from '../models/Token';
import ApiError from '../utils/apiError';
import { tokenTypes } from '../types/tokenTypes';
import { getUserByEmailService, getUserByIdService, updateUserByIdService } from './userServices';
import UserModel from '../models/User';
import { generateAuthTokenService, verifyToken } from './tokenService';

const loginWithEmailAndPassword = async (email: string, password: string) => {
  const user = await getUserByEmailService(email);
  if (!user || !(await UserModel.matchPasswords(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

const logoutService = async (refreshToken: string) => {
  const deletedRefreshToken = await TokenModel.findOneAndDelete({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!deletedRefreshToken) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
};

const refreshAuthService = async (refreshToken:string) => {
  try {
    const refreshTokenDoc = await verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await getUserByIdService(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await logoutService(refreshToken)
    return generateAuthTokenService(user._id);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

const resetPasswordService = async (resetPasswordToken:string, newPassword:string) => {
    try {
      if(!resetPasswordToken){
        throw new Error()
      }
      const resetPasswordTokenDoc = await verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
      const user = await getUserByIdService(resetPasswordTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      await updateUserByIdService(user.id, { password: newPassword });
      await TokenModel.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
    }
  };

export { loginWithEmailAndPassword, logoutService, refreshAuthService, resetPasswordService };