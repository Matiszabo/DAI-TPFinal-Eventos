import CategoryRepository from '../repositories/event_category-repository.js';

export default class CategoryService {
	constructor() {
		this.repo = new CategoryRepository();
	}

	async getCategories(id) {
		try {
			const response = await this.repo.getCategories({ id });
			return response.length > 0
				? [{ success: true, response }, 200]
				: [{ success: false, message: 'No hay categorias para mostrar' }, 404];
		} catch (error) {
			throw new Error(`Service error - getCategories() : ${error.message}`);
		}
	}

	async createCategory(data) {
		if (!data.name || data.name.length < 3) {
			return [
				{ success: false, message: 'Nombre no válido. Debe tener al menos 3 letras.' },
				400,
			];
		}
		try {
			await this.repo.createCategory(data);
			return [{ success: true, message: 'Categoría creada exitosamente.' }, 201];
		} catch (error) {
			throw new Error(`Service error - createCategory() : ${error.message}`);
		}
	}

	async updateCategory(data) {
		if (!data.id) {
			return [{ success: false, message: 'ID no proporcionado.' }, 400];
		}

		if (!data.name || data.name.length < 3) {
			return [
				{ success: false, message: 'Nombre no válido. Debe tener al menos 3 letras.' },
				400,
			];
		}

		try {
			const updated = await this.repo.updateCategory(data);
			return updated
				? [{ success: true, message: 'Categoría actualizada exitosamente.' }, 200]
				: [{ success: false, message: 'Categoría no encontrada.' }, 404];
		} catch (error) {
			throw new Error(`Service error - updateCategory() : ${error.message}`);
		}
	}

	async deleteCategory(id) {
		try {
			const deleted = await this.repo.deleteCategory(id);
			return deleted
				? [{ success: true, message: 'Categoría eliminada exitosamente.' }, 200]
				: [{ success: false, message: 'Categoría no encontrada.' }, 404];
		} catch (error) {
			throw new Error(`Service error - deleteCategory() : ${error.message}`);
		}
	}
}
