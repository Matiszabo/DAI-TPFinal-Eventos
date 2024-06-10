import express from "express";
import EnrollmentService from "../services/enrollment-service.js";
const router = express.Router();

const enrollmentService = new EnrollmentService();

router.post("/:id/enrollment", async (req, res) => {
    const eventId = req.params.id;
    const userId = req.body.userId;
    try {
        const result = await enrollmentService.enrollUserToEvent(eventId, userId);
        if (result.success) {
            res.status(201).json({ message: "Usuario inscrito al evento con éxito" });
        } else {
            res.status(400).json({ message: result.error });
        }
    } catch (error) {
        res.status(404).json({ message: "Evento no encontrado" });
    }
});

router.delete("/:id/enrollment", async (req, res) => {
    const eventId = req.params.id;
    const userId = req.body.userId;
    try {
        const result = await enrollmentService.removeUserFromEvent(eventId, userId);
        if (result.success) {
            res.status(200).json({ message: "Usuario borrado del evento con éxito" });
        } else {
            res.status(400).json({ message: result.error });
        }
    } catch (error) {
        res.status(404).json({ message: "Evento no encontrado" });
    }
});

export default router;
