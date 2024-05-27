import {Router} from 'express';
import LocationsService from '../services/locations_service.js';
const router = Router();
const svc = new locations_service();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllAsync();
    if (returnArray != null){
        respuesta = res.status(200).json(returnArray);
    } else {
        respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
    });

router.get('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;
    const event_categories = await svc.getByIdAsync(id)
    if (event_categories != null){
        respuesta = res.status(200).json(event_categories);
    } else {
        respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
});

router.post('', async (req, res) => {
    let respuesta;
    let  newEvent_categories = req.body;
    const province = await svc.createAsync(newEvent_categories)
    if (event_categories != null){
        respuesta = res.status(201).json("created");
    } else {
        respuesta = res.status(400).send(`Error interno.`);
    }
    return respuesta;
})

router.put('', async (req, res) => {
    let respuesta;
    let  newEvent_categories = req.body;
    const event_categories = await svc.updateAsync(newEvent_categories)
    if (event_categories != null){
        respuesta = res.status(201).json("created");
    } else {
        respuesta = res.status(400).send(`Error interno.`);
    }
    return respuesta;
})

router.delete('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;
    const event_categories = await svc.deleteByIdAsync(id)
    if (event_categories != null){
        respuesta = res.status(200).json("Eliminada");
    } else {
        respuesta = res.status(404).send(`Not Found.`);
    }
    return respuesta;
})

export default router;