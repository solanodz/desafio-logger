import { Router } from "express";
import productController from "../controllers/products.controller.js";
import { uploader } from "../utils.js";
import { deleteProductCart } from "../middleware/daleteCascade.js"

const router = Router();

router.get("/products", async (req, res, next) => {
    try {
        const { query = {} } = req;
        const product = await productController.get(query);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
        next(error);
    }
});

router.get("/products/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await productController.getById({ _id: pid });
        if (!product) {
            return res.status(404).json({ message: "No user found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
        next(error);
    }
});

router.post("/products", uploader.single("file"), async (req, res, next) => {
    try {
        const { body, file } = req;
        if (file) {
            body.thumbnail = {
                filename: file.filename,
                path: file.path,
            };
        }
        const result = await productController.createProduct(body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
        next(error);
    }
});

router.put("/products/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const { body } = req;
        const result = await productController.updateById(pid, body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
        next(error);
    }
});

router.delete("/products/:pid", deleteProductCart, async (req, res, next) => {
    try {
        const { pid } = req.params;
        const result = await productController.deleteById(pid);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
        next(error);
    }
});

export default router;