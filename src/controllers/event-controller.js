import {Router} from 'express';
import EventService from './../services/event-service.js';
import Event from './../entities/event.js';
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware.js';
const router = Router();
const svc = new EventService();
const svcA = new AuthenticationMiddleware();

router.get('', async (req, res) => {
    let response;
    const searchParams = [req.query.name, req.query.category, req.query.startdate, req.query.tag, req.query.eventlocation];
    const returnObject = await svc.getSearchSync(searchParams);
    if (returnObject != null){
        response = res.status(200).json(returnObject)
    }
    else {
        response = res.status(404).send("Id no encontrado.");
    };
    return response;
});

router.get('/:id', async (req, res) => {
    let response;
    const returnObject = await svc.getByIdSync(req.params.id);
    if (returnObject != null){
        response = res.status(200).json(returnObject)
    }
    else {
        response = res.status(404).send("Id no encontrado.");
    };
    return response;
});

router.get('/:id/enrollment', async (req, res) => {
    let response;
    const searchParams = [req.query.first_name, req.query.last_name, req.query.username, req.query.attended, req.query.rating];
    const returnObject = await svc.getEnrollmentById(req.params.id, searchParams);
    if (returnObject != null){
        response = res.status(200).json(returnObject)
    }
    else {
        response = res.status(404).send("Id no encontrado o evento sin inscripciones.");
    };
    return response;
});

router.post('/:id/enrollment', svcA.AuthMiddleware, async (req, res) => {
    let response;
    response = await svc.enrollUser(req.params.id, req.user.id);
    if (typeof(response) === 'string'){
        if (response === 'ID_ERROR'){
            response = res.status(404).send("Id no encontrado");
        }
        else{
            response = res.status(400).send(response)
        }
    }
    else {
        response = res.status(201).send('Usuario inscripto');
    };
    return response;
});

router.patch('/:id/enrollment/:rating', svcA.AuthMiddleware, async (req, res) => {
    let response;
    const params = [parseInt(req.params.id), parseInt(req.params.rating), req.body.observations, req.user.id];
    response = await svc.patchEnrollment(params);
    if (typeof(response) === 'string'){
        if (response === 'ID_ERROR'){
            response = res.status(404).send("Id no encontrado");
        }
        else{
            response = res.status(400).send(response);
        }
    }
    else {
        response = res.status(200).send("Se actualizo el enrollment correctamente.");
    };
    return response;
});

router.delete('/:id/enrollment', svcA.AuthMiddleware, async (req, res) => {
    let response;
    response = await svc.deleteEnrollmentById(req.params.id, req.user.id);
    if (typeof(response) === 'string'){
        if (response === 'ID_ERROR'){
            response = res.status(404).send("Id no encontrado");
        }
        else{
            response = res.status(400).send(response)
        }
    }
    else {
        response = res.status(201).send('Inscripcion eliminada.');
    };
    return response;
});

router.post('', svcA.AuthMiddleware, async (req, res) => {
    let response;
    const event = new Event(undefined, req.body.name, req.body.description, req.body.id_event_category, req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, req.body.enabled_for_enrollment, req.body.max_assistance, req.user.id);
    response = await svc.createAsync(event);
    if (typeof(response) === 'string'){
        response = res.status(400).send(response);
    }
    else if (response == 1){
        response = res.status(201).send('Se creo correctamente el objeto.');
    }
    else{
        response = res.status(400).send('Ha ocurrido un error');
    }
    return response;
});

router.put('', svcA.AuthMiddleware, async (req, res) => {
    let response;
    const event = new Event(req.body.id, req.body.name, req.body.description, req.body.id_event_category, req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, req.body.enabled_for_enrollment, req.body.max_assistance, req.user.id);
    response = await svc.updateAsync(event);
    if (typeof(response) === 'string'){
        response = res.status(400).send(response);
    }
    else if (response == 1){
        response = res.status(201).send('Se actualizo correctamente el objeto.');
    }
    else{
        response = res.status(400).send('Ha ocurrido un error');
    }
    return response;
});

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