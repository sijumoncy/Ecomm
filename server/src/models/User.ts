import { NextFunction } from 'express';
import {Schema, model, Model} from 'mongoose';
import bcrypt from 'bcryptjs'

export interface UserInterface {
    name: string;
    email: string;
    isEmailVerified: boolean;
    passwordHash: string;
    phone: string;
    address: string;
    isAdmin: boolean;
    street: string;
    apartment: string;
    zip: string;
    city: string;
    country: string;
}

interface UserModel extends Model<UserInterface> {
    isEmailExist(email:string, excludeUserId?:Schema.Types.ObjectId):Promise<boolean>
    matchPasswords: (password:string) => Promise<boolean>
}

const userSchema = new Schema<UserInterface, UserModel>({
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

// shcema fucntion to check the email exist or not
userSchema.static('isEmailExist', async function isEmailExist(email:string, excludeUserId:string){
    const user:UserInterface|null = await this.findOne({ email, _id: { $ne: excludeUserId }});
    return !!user
})

userSchema.methods.matchPasswords = async function(password:string):Promise<boolean> {
    const user = this;
    return bcrypt.compare(password, user.passwordHash)
}

userSchema.pre("save", async function(next){
    const user = this;
    if(user.isModified("passwordHash")) {
        user.passwordHash = await bcrypt.hash(user.passwordHash, 8)
    }
    next()
})


const UserModel = model<UserInterface, UserModel>('User', userSchema);
export default UserModel;