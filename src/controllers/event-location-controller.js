import {Router} from 'express';
import EventLocationService from './../services/event-location-service.js';
import CommonService from './../services/common-service.js';
import EventLocation from '../entities/event-location.js';
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware.js';
const router = Router();
const svc = new EventLocationService();
const cmnSvc = new CommonService();
const svcA = new AuthenticationMiddleware();

router.get('', svcA.AuthMiddleware, async (req, res) => {
    let respuesta;
    const returnArray = await cmnSvc.getAllSync('event_locations');
    if (returnArray != null){
        respuesta = res.status(200).json(returnArray);
    }
    else {
        respuesta = res.status(500).send('Error interno.');
    }
    return respuesta;
});

router.get('/:id', svcA.AuthMiddleware, async (req, res) => {
    let respuesta;
    const returnObject = await cmnSvc.getByIdSync('event_locations', req.params.id);
    if (returnObject != null){
        respuesta = res.status(200).json(returnObject)
    }
    else {
        respuesta = res.status(404).send("Id no encontrado.");
    };
    return respuesta;
});

router.post('', svcA.AuthMiddleware, async (req, res) => {
    let response;
    const eventLocation = new EventLocation(undefined, req.body.id_location, req.body.name, req.body.full_address, req.body.max_capacity, req.body.latitude, req.body.longitude, req.user.id);
    response = await svc.createAsync(eventLocation);
    if (typeof(response) === 'string'){
        response = res.status(400).send(response);
    }
    else if (response == 1){
        response = res.status(201).send('Se creó correctamente el objeto.');
    }
    else{
        response = res.status(400).send('Ha ocurrido un error.');
    }
    return response;
});

router.put('', svcA.AuthMiddleware, async (req, res) => {
    let response;
    const eventLocation = new EventLocation(req.body.id, req.body.id_location, req.body.name, req.body.full_address, req.body.max_capacity, req.body.latitude, req.body.longitude, req.user.id);
    console.log(eventLocation);
    response = await svc.updateAsync(eventLocation);
    if (typeof(response) === 'string'){
        response = res.status(400).send(response);
    }
    else if (response == 1){
        response = res.status(201).send('Se actualizo correctamente el objeto.');
    }
    else{
        response = res.status(400).send('Ha ocurrido un error.');
    }
    return response;
});

router.delete('/:id', svcA.AuthMiddleware, async (req, res) => {
    let response;
    response = await cmnSvc.deleteByIdAsync('event_locations', req.params.id);
    if (response == 1){
        response = res.status(200).send("Objeto borrado.");
    }
    else if (response > 1){
        response = res.status(400).send("Mas de un objeto borrado.");
    }
    else if (response < 1){
        response = res.status(404).send("No se ha borrado el objeto.");
    }
    return response;
});

export default router;