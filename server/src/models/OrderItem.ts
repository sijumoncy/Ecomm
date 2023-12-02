import {Schema, model} from 'mongoose';
import { ProductInterface } from './Product';

const oderItemSchema = new Schema<OrderItemInterface>({
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

const OrderItemModel = model<OrderItemInterface>("OrderItem", oderItemSchema)
export default OrderItemModel;