import { type Document, Schema, model } from "mongoose";
type IProduct = Document & {
  _id: string;
  name: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};
export const ProductSchema: any = new Schema<IProduct>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
  },

  { collection: "products", timestamps: true },
);

// Model creation based on the schema and interface

export default model("Product", ProductSchema);
