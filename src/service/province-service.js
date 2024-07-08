import ProvinceRepository from '../repositories/province-repository.js';

export default class ProvinceService {
	constructor() {
		this.repo = new ProvinceRepository();
	}

	async getProvinces() {
		try {
			const response = await this.repo.getProvinces();
			return response.length > 0
				? [{ success: true, response }, 200]
				: [{ success: false, message: 'No hay provincias para mostrar' }, 404];
		} catch (error) {
			throw new Error(`Service error - getProvinces() : ${error.message}`);
		}
	}

	async getLocationsByProvince(id) {
		try {
			const response = await this.repo.getLocationsByProvince(id);
			return response.length > 0
				? [{ success: true, response }, 200]
				: [{ success: false, message: 'No hay ubicaciones para mostrar' }, 404];
		} catch (error) {
			throw new Error(`Service error - getLocationsByProvince() : ${error.message}`);
		}
	}

	async getProvinceById(id) {
		try {
			const response = await this.repo.getProvinceById(id);
			return response.length > 0
				? [{ success: true, response }, 200]
				: [{ success: false, message: 'No existe una provincia con ese ID' }, 404];
		} catch (error) {
			throw new Error(`Service error - getProvinceById() : ${error.message}`);
		}
	}

	async addProvince({ name, full_name, latitude, longitude, display_order }) {
		if (!name || name.length < 3) {
			return [
				{
					success: false,
					message: 'El nombre de la provincia tiene que tener 3 o más letras',
				},
				400,
			];
		}
		try {
			await this.repo.addProvince({
				name,
				full_name,
				latitude,
				longitude,
				display_order,
			});
			return [{ success: true, message: 'Provincia agregada correctamente' }, 201];
		} catch (error) {
			throw new Error(`Service error - addProvince() : ${error.message}`);
		}
	}

	async updateProvince(body) {
		const data = body;
		if (data.name.length < 3) {
			return [
				{
					success: false,
					message: 'El nombre de la provincia tiene que tener 3 o más letras',
				},
				400,
			];
		}
		if (isNaN(data.latitude) || isNaN(data.longitude)) {
			return [
				{
					success: false,
					message: 'Los campos latitud y longitud tienen que ser números',
				},
				400,
			];
		}
		try {
			const [province] = await this.getProvinceById(body.id);
			if (!province.success) {
				return [{ success: false, message: 'No existe una provincia con ese ID' }, 404];
			}
			await this.repo.updateProvince(body.id, data);
			return [{ success: true, message: 'Provincia editada correctamente' }, 200];
		} catch (error) {
			throw new Error(`Service error - updateProvince() : ${error.message}`);
		}
	}

	async deleteProvince(id) {
		try {
			const [province] = await this.getProvinceById(id);
			if (!province.success) {
				return [{ success: false, message: 'No existe una provincia con ese ID' }, 404];
			}
			await this.repo.deleteProvince(id);
			return [{ success: true, message: 'Provincia eliminada correctamente' }, 200];
		} catch (error) {
			throw new Error(`Service error - deleteProvince() : ${error.message}`);
		}
	}
}
