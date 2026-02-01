import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  image?: string | null;
  slug?: string;
  isDeleted?: boolean;
  deletedAt?: Date | null;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, default: null },
    slug: { type: String },
  },
  { timestamps: true },
);

const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
