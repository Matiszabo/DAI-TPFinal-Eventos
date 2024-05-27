import UsersRepository from '../repositories/event_users-repository.js';

export default class UsersService {
    getByUsernameAsync = async (entity) => {
        const repo = new UsersRepository();
        const user = await repo.getByUsernameAsync(entity);
        return user;
    }

    createAsync = async (entity) => {
        const repo = new UsersRepository();
        const user = await repo.createAsync(entity);
        return user;
    }
}