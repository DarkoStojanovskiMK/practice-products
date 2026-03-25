import express from "express";
import productsController from "./products.controller.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();

router.get("/api/products", verifyToken, productsController.getAll);
router.post("/api/products", verifyToken, productsController.create);
router.put("/api/products/:id", verifyToken, productsController.update);
router.delete("/api/products/:id", verifyToken, productsController.delete);

export default router;
