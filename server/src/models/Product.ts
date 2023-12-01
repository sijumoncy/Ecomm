import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: {
      type: String,
      required: true
    },
    richDescription: {
        type: String,
        default: ''
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
  },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    stock: { type: Number, min: 0, default:0 },
    rating: {
      type: String,
      default: 0
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
  }, {timestamps:true}
);

export interface ProductInterface extends Document {
  name: string;
  description: string;
  richDescription: string;
  image: string;
  images: string[];
  brand: string;
  price: Number;
  stock: Number;
  rating: Number;
  numReviews: Number;
  isFeatured: Boolean;
}

export default mongoose.model<ProductInterface>("Product", productSchema)