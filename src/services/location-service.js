import LocationRepository from '../repositories/location-repository.js';

export default class LocationService{
    getAllSync = async () => {
        const repo = new LocationRepository();
        let returnArray = await repo.getAllSync();
        return returnArray;
    }
    
    getByIdSync = async (id) => {
        const repo = new LocationRepository();
        let returnObject = await repo.getByIdSync(id);
        return returnObject;
    }
    getEventLocationByIdSync = async (id) => {
        const repo = new LocationRepository();
        let returnObject = await repo.getByEventLocationIdSync(id);
        return returnObject; 
    }
}