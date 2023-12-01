import Joi from "joi";
import httpStatus from 'http-status'
import { pickKeyValues } from "../utils/pickKeyValues";
import ApiError from "../utils/apiError";
import { NextFunction } from "express";

const validate = (schema:object) => (req:Request, res:Response,next:NextFunction) => {
    const validSchema = pickKeyValues(schema, ['params', 'query', 'body'])
    const reqObject = pickKeyValues(req, Object.keys(validSchema))
    const {value, error} = Joi.compile(validSchema).prefs({errors:{label:"key"}, abortEarly:false}).validate(reqObject)

    if(error){
        const errMsg = error.details.map((detail) => detail.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errMsg))
    }

    Object.assign(req, value)
    return next()
}

export default validate