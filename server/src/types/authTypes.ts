import { Request } from "express";
import { UserInterface } from "../models/User";

export interface IRequestUser extends Request {
    user:UserInterface
}

export interface IAuthRequest extends Request {
    headers : {authorization? : string, Authorization?:string};
    cookies : {authToken?: string; accessToken?: string; refreshToken?: string };
    user?:UserInterface
}