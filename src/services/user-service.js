import UserRepository from '../repositories/user-repository.js';
import jwt from 'jsonwebtoken'
export default class UserService{
    getAllAsync = async () => {
        const repo = new Event_categoryRepository();
        let returnArray = await repo.getAllAsync();
        return returnArray;
    }
    verifyAsync = async (username, Password) => {
        
        const repo = new UserRepository();
        let returnArray = await repo.verifyAsync(username,Password);

        if(returnArray != undefined){
            const payload = {
                id: returnArray.id,
                username: returnArray.username
            }
        
            const options = {
                expiresIn: '1h'
            }
            const token = jwt.sign(payload,"SECRET_KEY", options)
    
            return token;
        }else{
            return "Usuario o contraseña invalidos"
        }   
        
    }

    getByIdAsync = async (id) => {
        const repo = new Event_categoryRepository();
        let returnArray = await repo.getByIdAsync(id);
        return returnArray;
    }
    createAsync = async (entity) => {
        const repo = new UserRepository();
        let returnArray = await repo.createAsync(entity);
        return returnArray;
    }
    updateAsync = async (entity) => {
        const repo = new Event_categoryRepository();
        const objeto = await repo.updateAsync(entity);
        return objeto;
    }
    deleteByIdAsync = async (id) => {
        const repo = new Event_categoryRepository();
        const objeto = await repo.deleteByIdAsync(id);
        return objeto;
    }
}