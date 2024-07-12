import EventCategoryRepository from '../repositories/event-category-repository.js';

export default class EventCategoryService{
    getAllSync = async () => {
        const repo = new EventCategoryRepository();
        let returnArray = await repo.getAllSync();
        return returnArray;
    }
    
    getByIdSync = async (id) => {
        const repo = new EventCategoryRepository();
        let returnObject = await repo.getByIdSync(id);
        return returnObject;
    }
    createAsync = async (entity) => {
        const repo = new EventCategoryRepository();
        let response = await repo.createAsync(entity);
        return response;
    }
    updateAsync = async (entity) => {
        const repo = new EventCategoryRepository();
        let response = await repo.updateAsync(entity);
        return response;
    }
    deleteByIdAsync = async (id) => {
        const repo = new EventCategoryRepository();
        let response = await repo.deleteByIdAsync(id);
        return response;
    }
}