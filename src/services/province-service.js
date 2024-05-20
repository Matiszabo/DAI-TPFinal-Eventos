import ProvinceRepository from "../repositories/provinces-repository.js";

export default class ProvinceService{

    getAllAsync = async () => {
        const repo = new ProvinceRepository();
        const returnArray = await  repo.getAllAsync();
        return returnArray;
    }

    getById = async (id) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getById(id);
        return returnArray;
    }

    insertProvince = async (entity) => {
        const repo = new ProvinceRepository();
        await repo.insertProvince(entity);
    }

    updateProvince = async (entity) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.updateProvince(entity);
        return returnArray;
    }

    deleteProvince = async (provAEliminar) => {
        const repo = new ProvinceRepository();
        await repo.deleteProvince(provAEliminar);
    }
    
}