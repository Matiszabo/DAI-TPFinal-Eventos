import LocationRepository from '../repositories/location-repository.js';

export default class LocationService {
	constructor() {
		this.repo = new LocationRepository();
	}

	async getLocations(id) {
		try {
			const response = await this.repo.getLocations({ id });
			return response.length > 0
				? [{ success: true, response }, 200]
				: [{ success: false, message: 'No hay ubicaciones para mostrar' }, 404];
		} catch (error) {
			throw new Error(`Service error - getLocations() : ${error.message}`);
		}
	}

	async getEventLocations(id) {
		try {
			const response = await this.repo.getEventLocations(id);
			return response.length > 0
				? [{ success: true, response }, 200]
				: [
						{ success: false, message: 'No hay ubicaciones de eventos para mostrar' },
						404,
				  ];
		} catch (error) {
			throw new Error(`Service error - getEventLocations() : ${error.message}`);
		}
	}
}
