import Product from "../../DB/models/products.js";
import { type Request, type Response } from "express";

export default {
  getAll: async (req: Request, res: Response) => {
    try {
      const products = await Product.find({});
      return res.status(200).json(products);
    } catch (error: any) {
      return res.status(500).json(`Error: ${error.message}`);
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      await Product.create(req.body);
      return res
        .status(200)
        .json({ success: true, message: "Teams created successfully" });
    } catch (error: any) {
      return res.status(500).json(`Error: ${error.message}`);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const updateData = {
        ...req.body,
        quantity: Number(req.body.quantity), // Ensures it's a Number; NaN if invalid
      };

      await Product.findByIdAndUpdate(
        req.params.id,
        { $set: updateData }, // Use $set explicitly for partial updates
        { returnDocument: "after", runValidators: true },
      );

      return res
        .status(200)
        .json({ success: true, message: "Teams updated successfully" });
    } catch (error: any) {
      return res.status(500).json(`Error: ${error.message}`);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ success: true, message: "Teams deleted successfully" });
    } catch (error: any) {
      return res.status(500).json(`Error: ${error.message}`);
    }
  },
};
