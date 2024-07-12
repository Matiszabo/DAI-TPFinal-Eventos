import CommonRepository from "../repositories/common-repository.js";

export default class CommonService{
    getAllSync = async (table_name) => {
        const repo = new CommonRepository();
        let returnArray = await repo.getAllSync(table_name);
        return returnArray;
    }
    
    getByIdSync = async (table_name, id) => {
        const repo = new CommonRepository();
        let returnObject = await repo.getByIdSync(table_name, id);
        return returnObject;
    }
    
    deleteByIdAsync = async (table_name, id) => {
        const repo = new CommonRepository();
        let response = await repo.deleteByIdAsync(table_name, id);
        return response;
    }
}