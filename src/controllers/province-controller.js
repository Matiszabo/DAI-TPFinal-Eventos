import {Router} from 'express';
import ProvinceService from './../services/province-service.js'
const router = Router();
const svc = new ProvinceService();

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
    const province = await svc.getByIdAsync(id)
    if (province != null){
        respuesta = res.status(200).json(province);
    } else {
        respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
});

router.post('', async (req, res) => {
    let respuesta;
    let  newProvince = req.body;
    const province = await svc.createAsync(newProvince)
    if (province != null){
        respuesta = res.status(201).json("created");
    } else {
        respuesta = res.status(400).send(`Error interno.`);
    }
    return respuesta;
})

router.put('', async (req, res) => {
    let respuesta;
    let  newProvince = req.body;
    const province = await svc.updateAsync(newProvince)
    if (province != null){
        respuesta = res.status(201).json("created");
    } else {
        respuesta = res.status(400).send(`Error interno.`);
    }
    return respuesta;
})

router.delete('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;
    const province = await svc.deleteByIdAsync(id)
    if (province != null){
        respuesta = res.status(200).json("Eliminada");
    } else {
        respuesta = res.status(404).send(`Not Found.`);
    }
    return respuesta;
})

export default router;