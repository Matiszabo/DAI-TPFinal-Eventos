import UserRepository from '../repositories/user-repository.js';
import { validateUserData, generateToken } from '../helpers/validaciones-helper.js';

export default class UserService {
	constructor() {
		this.repo = new UserRepository();
	}

	async getUsers() {
		try {
			const response = await this.repo.getUsers();
			if (response.length > 0) {
				return [{ success: true, response }, 200];
			} else {
				return [{ success: false, message: ['No hay usuarios para mostrar'] }, 404];
			}
		} catch (error) {
			throw new Error(`Service error - getUsers() : ${error.message}`);
		}
	}

	async login({ username, password }) {
		try {
			const [user] = await this.repo.getUser(username);
			if (!user) {
				return [{ success: false, message: ['Usuario inexistente'], token: '' }, 401];
			}
			if (user.password !== password) {
				return [{ success: false, message: ['Contraseña incorrecta'], token: '' }, 401];
			}
			const token = generateToken(user);
			return [
				{ success: true, message: ['Sesión iniciada correctamente'], token },
				200,
			];
		} catch (error) {
			throw new Error(`Service error - login() : ${error.message}`);
		}
	}

	async register(userData) {
		try {
			const [user] = await this.repo.getUser(userData.username);
			if (user) {
				return [{ success: false, message: ['Ese mail ya está registrado'] }, 400];
			}
			const validationMessages = validateUserData(userData);
			if (validationMessages.length > 0) {
				return [{ success: false, message: validationMessages }, 400];
			}
			await this.repo.addUser(userData);
			return [{ success: true, message: ['Usuario registrado correctamente'] }, 201];
		} catch (error) {
			throw new Error(`Service error - register() : ${error.message}`);
		}
	}
}
