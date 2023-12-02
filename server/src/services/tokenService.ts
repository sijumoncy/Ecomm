import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import moment, { Moment } from 'moment';
import { config } from '../config/config';
import ApiError from '../utils/apiError';
import { tokenTypes } from '../types/tokenTypes';
import TokenModel from '../models/Token';
import { getUserByEmailService } from './userServices';

const generateToken = async (
  userId: mongoose.Types.ObjectId | string,
  expires: Moment,
  type: string,
  secret: string = config.jwt.secret
): Promise<string> => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (
  token: string,
  userId: mongoose.Types.ObjectId,
  expires: Moment,
  type: string,
  blacklisted = false
) => {
  const tokenDoc = await TokenModel.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const verifyToken = async (token: string, type: string) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await TokenModel.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

const generateAuthTokenService = async (userId: mongoose.Types.ObjectId) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );
  const accessToken = await generateToken(
    userId,
    accessTokenExpires,
    tokenTypes.ACCESS
  );
  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days'
  );
  const refreshToken = await generateToken(
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const generateResetPasswordTokenService = async (email: string) => {
  const user = await getUserByEmailService(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    'minutes'
  );
  const resetPasswordToken = await generateToken(
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  return resetPasswordToken;
};

export {
  generateAuthTokenService,
  verifyToken,
  generateToken,
  saveToken,
  generateResetPasswordTokenService,
};
