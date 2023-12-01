import {Schema, model} from 'mongoose';
import { ProductInterface } from './Product';

const oderItemSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
}, {timestamps:true})

export interface OrderItemInterface extends Document {
    product: ProductInterface;
    quantity: number;
}
  
export default model<OrderItemInterface>("OrderItem", oderItemSchema)