import {Schema, model} from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
      },
    icon: {
        type: String
    },
    color: {
        type: String
    }
}, {timestamps:true})

export interface CategoryInterface extends Document {
    name: string;
    description: string;
    icon: string;
    color: string;
}
  
export default model<CategoryInterface>("Category", categorySchema)