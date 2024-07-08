import EventLocationRepository from '../repositories/event_location-repository.js';

export default class EventLocationService {
	constructor() {
		this.repo = new EventLocationRepository();
	}

	async getEventLocations(req) {
		const { id } = req.params;
		try {
			const response = await this.repo.getEventLocations({ id, userId: req.user.id });
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

	async getEventLocation(req) {
		const { id } = req.params;
		const { id: userId } = req.user;
		try {
			const response = await this.repo.getEventLocation({ id, userId });
			return response
				? [{ success: true, response }, 200]
				: [
						{
							success: false,
							message: 'Ubicación de evento no encontrada o no pertenece al usuario',
						},
						404,
				  ];
		} catch (error) {
			throw new Error(`Service error - getEventLocation() : ${error.message}`);
		}
	}

	async createEventLocation(req) {
		const data = req.body;
		data.id_creator_user = req.user.id;
		if (
			!data.name ||
			data.name.length < 3 ||
			!data.full_address ||
			data.full_address.length < 3
		) {
			return [
				{
					success: false,
					message: 'Nombre o dirección no válidos. Deben tener al menos 3 letras.',
				},
				400,
			];
		}
		if (!data.id_location || data.max_capacity <= 0) {
			return [
				{
					success: false,
					message: 'ID de ubicación inexistente o capacidad máxima no válida.',
				},
				400,
			];
		}
		try {
			await this.repo.createEventLocation(data);
			return [
				{ success: true, message: 'Ubicación de evento creada exitosamente.' },
				201,
			];
		} catch (error) {
			throw new Error(`Service error - createEventLocation() : ${error.message}`);
		}
	}

	async updateEventLocation(req) {
		const data = req.body;
		data.id_creator_user = req.user.id;
		if (!data.id) {
			return [{ success: false, message: 'ID no proporcionado.' }, 400];
		}
		if (
			!data.name ||
			data.name.length < 3 ||
			!data.full_address ||
			data.full_address.length < 3
		) {
			return [
				{
					success: false,
					message: 'Nombre o dirección no válidos. Deben tener al menos 3 letras.',
				},
				400,
			];
		}
		const eventLocation = await this.repo.getEventLocation({
			id: data.id,
			userId: req.user.id,
		});
		if (!eventLocation) {
			return [
				{
					success: false,
					message: 'Ubicación de evento no encontrada o no pertenece al usuario.',
				},
				404,
			];
		}
		try {
			await this.repo.updateEventLocation(data);
			return [
				{ success: true, message: 'Ubicación de evento actualizada exitosamente.' },
				200,
			];
		} catch (error) {
			throw new Error(`Service error - updateEventLocation() : ${error.message}`);
		}
	}

	async deleteEventLocation(id, userId) {
		try {
			const eventLocation = await this.repo.getEventLocation({ id, userId });
			if (!eventLocation) {
				return [
					{
						success: false,
						message: 'Ubicación de evento no encontrada o no pertenece al usuario.',
					},
					404,
				];
			}
			await this.repo.deleteEventLocation(id);
			return [
				{ success: true, message: 'Ubicación de evento eliminada exitosamente.' },
				200,
			];
		} catch (error) {
			throw new Error(`Service error - deleteEventLocation() : ${error.message}`);
		}
	}
}
