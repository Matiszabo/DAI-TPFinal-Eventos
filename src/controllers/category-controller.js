import express from "express";
import CategoryService from "../services/category-service.js";
const router = express.Router();

const categoryService = new CategoryService();

router.get("/", async (req, res) => {
    try {
        const category = await categoryService.getAllCategory();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryService.getCategoryById(id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: "Category no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const newCategory = req.body;
    try {
        const createdCategory = await categoryService.createCategory(newCategory);
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/", async (req, res) => {
    const updatedCategory = req.body;
    try {
        const result = await categoryService.updateCategory(updatedCategory);
        console.log(result);
        if (result === 1) {
            res.status(201).json({ message: "Category actualizada" });
        } else {
            res.status(404).json({ message: "Category no encontrada" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await categoryService.deleteCategory(id);
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Category eliminada" });
        } else {
            res.status(404).json({ message: "Category no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
