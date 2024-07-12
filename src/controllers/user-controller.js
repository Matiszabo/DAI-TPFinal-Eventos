import {Router} from 'express';
import UserService from '../services/user-service.js';
import User from '../entities/user.js'
import ValidationHelper from '../helpers/validation-helper.js';
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware.js'
const router = Router();
const svc = new UserService();
const mw = new AuthenticationMiddleware();

router.post('/login', async (req, res) => {
    let respuesta;
    const token = await svc.verifyAsync(req.body.username, req.body.password);
    let objeto = {
        success: true,
        message: "",
        token: null
    }
    if(token != null){
        if(token.length>50){
            objeto.token = token;
            respuesta = res.status(200).send(objeto);
        }else{
            objeto.token = token;
            objeto.success = false;
            respuesta = res.status(400).send(objeto);
        }
        
    }else{
        respuesta = res.status(500).send('Error interno.');
    }
})
router.post('/register', async (req, res) => {
    let respuesta;
    let usuario = new User(0,req.body.first_name,req.body.last_name,req.body.username,req.body.password)
    const returnArray = await svc.createAsync(usuario);
    if(returnArray == 1){
        respuesta = res.status(200).send('Se ha creado correctamente');
    }else{
        respuesta = res.status(500).send('Error interno.');
    }
})

router.put('', async (req, res) => {
    let respuesta;

    let event_categorie = new Event_categorie(req.body.id,req.body.name,req.body.display_order)
    const returnArray = await svc.updateAsync(event_categorie);
    if(returnArray == 1){
        respuesta = res.status(200).send('Se ha cambiado correctamente');
    }else{
        respuesta = res.status(500).send('Error interno.');
    }
})

router.delete('/:id', async (req, res) => {
    let respuesta;
    const returnArray = await svc.deleteByIdAsync(req.params.id);

    if(ValidationHelper.ValidaNumero(req.params.id)){
        respuesta = res.status(200).send("No se escribio un numero")
    }else{
        if(returnArray == 1){
            respuesta = res.status(200).send('Se ha eliminado correctamente');
        }else if(returnArray == 0){
            respuesta = res.status(200).send('No hay ninguna provincia con ese id');
        }else{
            respuesta = res.status(500).send('error interno');
        }
    }
    
})

export default router;