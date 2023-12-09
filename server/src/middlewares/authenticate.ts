import jwt, { VerifyErrors } from 'jsonwebtoken'
import httpStatus from "http-status"
import ApiError from "../utils/apiError"
import { NextFunction, Response } from "express"
import { config } from '../config/config'
import UserModel from '../models/User'
import { IAuthRequest } from '../types/authTypes'


// Auth need to be modified later with strict roles and checks
const checkTokenInReq = async (req:IAuthRequest, res:Response) => {
    try {
        const authHeader = (req && req.headers.authorization) || (req && req.headers.Authorization);
        const token = (authHeader && authHeader.split(' ')[1]) || req?.cookies?.authToken || req?.cookies?.accessToken || '';

        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED,'Unauthorized');
        }

        jwt.verify(token, config.jwt.secret as jwt.Secret, async (error:VerifyErrors|null, decodedUser:any) => {
            if(error) {
                const errorMsg = error.name === 'JsonWebTokenError' ? 'Unauthorized' : error.message;
                throw new ApiError(httpStatus.FORBIDDEN,'errorMsg'); 
            }
            
            try {
                const user = UserModel.findById(decodedUser.userId).select('-passwordHash')
                if(!user) {
                    throw new ApiError(httpStatus.FORBIDDEN, 'unable to authorize');
                }
                req.user = user as any
            }catch(err) {
                throw new ApiError(httpStatus.UNAUTHORIZED, 'authentication failed');
            }
        });
        
        return true;
    } catch(err) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'authentication failed')
    }
}

const authenticate = async (req:IAuthRequest, res:Response, next:NextFunction) => {
    try{
        const authenticated = await checkTokenInReq(req, res)
        if(!authenticated) return res.status(httpStatus.UNAUTHORIZED).send("Unauthorized")
        next()
    }catch(err) {
       throw new ApiError(httpStatus.UNAUTHORIZED, 'authentication failed')
    }
}

const checkPermissionAdminOrSameUserReq = async (req:IAuthRequest, res:Response, next:NextFunction) => {
    if(!req?.user || !req.user?.isAdmin || !req.user._id.equals(req.params.userId))  {
        throw new ApiError(httpStatus.FORBIDDEN, 'Access Denied')
    }
    next()
} 

const AdminOnlyAccess = async (req:IAuthRequest, res:Response, next:NextFunction) => {
    if(!req?.user || !req.user?.isAdmin){
        throw new ApiError(httpStatus.FORBIDDEN, 'Access Denied')
    }
    next()
}

export {
    authenticate,
    checkPermissionAdminOrSameUserReq,
    AdminOnlyAccess
}