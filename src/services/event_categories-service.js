import event_categories_Repository from "../repositories/event_categories-repositorie";

export default class event_categoriesService{

    getAllAsync = async () => {
        const repo = new event_categories_Repository();
        const returnArray = await  repo.getAllAsync();
        return returnArray;
    }

    getById = async (id) => {
        const repo = new event_categories_Repository();
        const returnArray = await repo.getById(id);
        return returnArray;
    }

    insertEvent_categories = async (entity) => {
        const repo = new event_categories_Repository();
        await repo.insertEvent_categories(entity);
    }

    updateEvent_categories = async (entity) => {
        const repo = new event_categories_Repository();
        const returnArray = await repo.updateEvent_categories(entity);
        return returnArray;
    }

    deleteEvent_categories = async (provAEliminar) => {
        const repo = new event_categories_Repository();
        await repo.deleteEvent_categories(provAEliminar);
    }
    
}