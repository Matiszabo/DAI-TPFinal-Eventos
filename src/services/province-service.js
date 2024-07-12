import ProvinceRepository from '../repositories/province-repository.js';

export default class ProvinceService{
    getAllSync = async () => {
        const repo = new ProvinceRepository();
        let returnArray = await repo.getAllSync();
        return returnArray;
    }
    
    getByIdSync = async (id) => {
        const repo = new ProvinceRepository();
        let returnObject = await repo.getByIdSync(id);
        return returnObject;
    }
    createAsync = async (entity) => {
        const repo = new ProvinceRepository();
        let response = await repo.createAsync(entity);
        return response;
    }
    updateAsync = async (entity) => {
        const repo = new ProvinceRepository();
        let response = await repo.updateAsync(entity);
        return response;
    }
    deleteByIdAsync = async (id) => {
        const repo = new ProvinceRepository();
        let response = await repo.deleteByIdAsync(id);
        return response;
    }
}