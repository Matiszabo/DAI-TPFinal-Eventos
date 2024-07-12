import EventLocationRepository from "../repositories/event-location-repository.js";
import ValidationHelper from "../helpers/validation-helper.js";
import CommonRepository from "../repositories/common-repository.js";

export default class EventLocationService{
    createAsync = async (eventLocation) => {
        const repo = new EventLocationRepository();
        const vh = new ValidationHelper();
        const cmnRepo = new CommonRepository();

        let response;
        if (eventLocation.name.length < 3 || vh.isNull(eventLocation.name) || eventLocation.full_address.length < 3 || vh.isNull(eventLocation.full_address)){
            response = 'El nombre o descripcion del evento tiene menos de 3 caracteres o es nulo.';
        }
        else if (eventLocation.max_capacity <= 0){
            response = 'La capacidad maxima debe ser mayor que 0.';
        }
        else if (cmnRepo.getByIdSync('locations', eventLocation.id_location) < 1){
            response = 'No existe location con ese nombre.';
        }
        else{
            response = await repo.createAsync(eventLocation);
        }
        return response;
    }
    
    updateAsync = async (eventLocation) => {
        const repo = new EventLocationRepository();
        const vh = new ValidationHelper();
        const cmnRepo = new CommonRepository();

        console.log('reached service');
        console.log('svc object', eventLocation)
        let response;
        if (eventLocation.name.length < 3 || vh.isNull(eventLocation.name) || eventLocation.full_address.length < 3 || vh.isNull(eventLocation.full_address)){
            response = 'El nombre o descripcion del evento tiene menos de 3 caracteres o es nulo.'
        }
        else if (cmnRepo.getByIdSync('event_locations', eventLocation.id) < 1){
            response = 'El id es inexistente.'
        }
        else if (eventLocation.max_capacity <= 0){
            response = 'La capacidad maxima debe ser mayor que 0.'
        }
        else{
            console.log('svc checks passed');
            response = await repo.updateAsync(eventLocation);
            console.log('svc finished');
        }
        return response;
    }
}