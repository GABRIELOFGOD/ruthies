import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  images?: string[] | null;
  price?: {
    NGN?: string;
    USD?: string;
    GBP?: string;
  };
  isAvailable?: boolean;
  stock?: number | null; // Amount available in stock
  description?: string;
  sizes?: string[] | null;
  colors?: string[];
  category?: string;
  gender?: "male" | "female" | "unisex";
  brand?: string;
  ratings: number; // Average rating
  numOfReviews: number; // Total number of reviews
  publisheshed: boolean;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    price: {
      NGN: { type: String, default: "0.00" },
      USD: { type: String, default: "0.00" },
      GBP: { type: String, default: "0.00" },
    },
    name: { type: String, required: true },
    description: String,
    images: [String],
    isAvailable: { type: Boolean, default: true },
    sizes: [String],
    colors: [String],
    category: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "unisex"] },
    brand: { type: String },
    stock: { type: Number, default: null },
    ratings: { type: Number, default: 0 },
    publisheshed: { type: Boolean, default: false },
    numOfReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// const Product: Model<IProduct> = mongoose.model<IProduct>(
//   "Product",
//   ProductSchema
// );
// export default Product;

const Product: Model<IProduct> =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
