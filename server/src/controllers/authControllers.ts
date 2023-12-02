import httpStatus from 'http-status';
import {loginWithEmailAndPassword, logoutService, refreshAuthService, resetPasswordService} from '../services/authService';
import {generateAuthTokenService, generateResetPasswordTokenService} from '../services/tokenService';
import {createUserService} from '../services/userServices'
import { Request, Response } from 'express';

const registerController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  const tokens = await generateAuthTokenService(user._id);
  res.status(httpStatus.CREATED).json(
    { message:'user registration successfull', data : {user, tokens} }
  );
};

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginWithEmailAndPassword(email, password);
  const tokens = await generateAuthTokenService(user._id);
  res.status(httpStatus.OK).json({message: 'login successfull', data:{ user, tokens} });
};

const logoutController = async (req: Request, res: Response) => {
  await logoutService(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
};

const refreshTokensController = async (req: Request, res: Response) => {
  const tokens = await refreshAuthService(req.body.refreshToken);
  res.send({ ...tokens });
};

const forgotPasswordController = async (req: Request, res: Response) => {
  const resetPasswordToken = await generateResetPasswordTokenService(req.body.email);
  // implment email based password reset - send email with token
  res.status(httpStatus.OK).json({resetPasswordToken});
};

const resetPasswordController = async (req: Request, res: Response) => {
  const resetToken = typeof req?.query?.token === 'string' ? req.query.token : ''
  await resetPasswordService(resetToken, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
};


export {
  registerController,
  loginController,
  logoutController,
  refreshTokensController,
  forgotPasswordController,
  resetPasswordController,
}