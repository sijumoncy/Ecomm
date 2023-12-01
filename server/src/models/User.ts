import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase:true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    passwordHash: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }
}, {timestamps:true})

export interface UserInterface extends Document {
    name: string;
    email: string;
    isEmailVerified: boolean;
    passwordHash: string;
    phone: string;
    isAdmin: boolean;
    street: string;
    apartment: string;
    zip: string;
    city: string;
    country: string;
}
  
export default model<UserInterface>("User", userSchema)