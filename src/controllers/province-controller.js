import {Router} from 'express';
import ProvinceService from './../services/province-service.js';
import Province from './../entities/province.js';
const router = Router();
const svc = new ProvinceService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllSync();
    if (returnArray != null){
        respuesta = res.status(200).json(returnArray);
    }
    else {
        respuesta = res.status(500).send('Error interno.');
    }
    return respuesta;
});

router.get('/:id', async (req, res) => {
    let respuesta;
    const returnObject = await svc.getByIdSync(req.params.id);
    if (returnObject != null){
        respuesta = res.status(200).json(returnObject)
    }
    else {
        respuesta = res.status(404).send("Id no encontrado.");
    };
    return respuesta;
})

router.post('', async (req, res) => {
    let respuesta;
    const provincia = req.body;
    const response = await svc.createAsync(provincia);
    if (response == 1){
        respuesta = res.status(201).send("Objeto creado.");
    }
    else if (response > 1){
        respuesta = res.status(400).send("Mas de un objeto creado.");
    }
    else if (response < 1){
        respuesta = res.status(400).send("No se creo el objeto.");
    }
    return respuesta;
})

router.put('', async (req, res) => {
    let respuesta;
    const provincia = req.body;
    const response = await svc.updateAsync(provincia);
    if (response == 1){
        respuesta = res.status(201).send("Objeto actualizado.");
    }
    else if (response > 1){
        respuesta = res.status(400).send("Mas de un objeto actualizado.");
    }
    else if (response < 1){
        respuesta = res.status(404).send("No se encontro el objeto.");
    }
    return respuesta;
})

router.delete('/:id', async (req, res) => {
    let respuesta;
    const response = await svc.deleteByIdAsync(req.params.id);
    if (response == 1){
        respuesta = res.status(200).send("Objeto borrado.");
    }
    else if (response > 1){
        respuesta = res.status(400).send("Mas de un objeto borrado.");
    }
    else if (response < 1){
        respuesta = res.status(404).send("No se ha borrado el objeto.");
    }
    return respuesta;
})

export default router;