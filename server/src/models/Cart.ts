import {Schema, model} from 'mongoose';
import { ProductInterface } from './Product';
import { UserInterface } from './User';

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity: {
        type: Number,
        required: true
    },
    
}, {timestamps:true})

export interface CartInterface extends Document {
    product: ProductInterface;
    user: UserInterface;
    quantity: number;
}
  
export default model<CartInterface>("Cart", cartSchema)