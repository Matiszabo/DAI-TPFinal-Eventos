import express from "express";
import ProvinceService from "../services/province-service.js";
const router = express.Router();

const provinceService = new ProvinceService();

router.get("/", async (req, res) => {
    try {
        const provinces = await provinceService.getAllProvinces();
        res.status(200).json(provinces);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const province = await provinceService.getProvinceById(id);
        if (province) {
            res.status(200).json(province);
        } else {
            res.status(404).json({ message: "Province no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const newProvince = req.body;
    try {
        const createdProvince = await provinceService.createProvince(newProvince);
        res.status(201).json(createdProvince);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/", async (req, res) => {
    const updatedProvince = req.body;
    try {
        const result = await provinceService.updateProvince(updatedProvince);
        if (result.modifiedCount === 1) {
            res.status(201).json({ message: "Province actualizada" });
        } else {
            res.status(404).json({ message: "Province no encontrada" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await provinceService.deleteProvince(id);
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Province borrada" });
        } else {
            res.status(404).json({ message: "Province no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
