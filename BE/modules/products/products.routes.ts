import express from "express";
import productsController from "./products.controller.ts";

import Product from "../../DB/models/products.ts";

const router = express.Router();

router.get("/api/products", productsController.getAll);
router.post("/api/products", productsController.create);
router.put("/api/products/:id", productsController.update);
router.delete("/api/products/:id", productsController.delete);

export default router;
