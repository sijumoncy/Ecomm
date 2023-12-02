import {Schema, model} from 'mongoose';

const categorySchema = new Schema<CategoryInterface>({
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
    description?: string;
    icon?: string;
    color?: string;
}

const CategoryModel = model<CategoryInterface>("Category", categorySchema)
export default CategoryModel;