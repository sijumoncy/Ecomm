import {Schema, model} from 'mongoose';
import { OrderItemInterface } from './OrderItem';
import { OrderStatusType } from '../types/commonTypes';
import { UserInterface } from './User';

const oderSchema = new Schema({
    orderItems : [{
        type: Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
    }],
    shippingAddress1: {
        type: String
    },
    shippingAddress2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    totalPrice: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateOrdered: {
        type: Date,
        dafault: Date.now
    },
    dateDelivered: {
        type: Date,
        dafault: Date.now
    }
}, {timestamps:true})

export interface OrderInterface extends Document {
    orderItems: OrderItemInterface;
    shippingAddress1: string;
    shippingAddress2: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
    status: OrderStatusType;
    totalPrice: number;
    dateOrdered: Date;
    user: UserInterface;
    dateDelivered: Date;
}
  
export default model<OrderInterface>("Order", oderSchema)