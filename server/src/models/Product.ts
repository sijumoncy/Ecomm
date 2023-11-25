import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, default:0 },
  },
  {
    timestamps: true,
  }
);

export interface ProductInterface extends Document {
  name: string;
  image: string;
  stock: Number;
}

export default mongoose.model<ProductInterface>("Product", productSchema)