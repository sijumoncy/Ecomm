import {Schema, model} from 'mongoose';
import { tokenTypes } from '../types/tokenTypes';

const tokenSchema = new Schema<TokenInterface>({
    token: {
        type: String,
        required: true,
        index: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      type: {
        type: String,
        enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD],
        required: true,
      },
      expires: {
        type: Date,
        required: true,
      },
      blacklisted: {
        type: Boolean,
        default: false,
      },
    
}, {timestamps:true})

export interface TokenInterface {
    token: string;
    user: Schema.Types.ObjectId;
    type: tokenTypes;
    expires:Date;
    blacklisted:boolean;
}

const TokenModel = model<TokenInterface>("Token", tokenSchema)
export default TokenModel;