import config from '../configs/db-config.js';
import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool(config);

export default class EventLocationRepository {
	async getEventLocations({ id, userId }) {
		const client = await pool.connect();
		let query = 'SELECT * FROM event_locations WHERE id_creator_user = $1';
		const params = [userId];
		if (id) {
			query += ' AND id = $2';
			params.push(id);
		}
		try {
			const result = await client.query(query, params);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getEventLocation({ id, userId }) {
		const client = await pool.connect();
		const query =
			'SELECT * FROM event_locations WHERE id = $1 AND id_creator_user = $2';
		const params = [id, userId];
		try {
			const result = await client.query(query, params);
			return result.rows[0];
		} finally {
			client.release();
		}
	}

	async createEventLocation({
		id_location,
		name,
		full_address,
		max_capacity,
		latitude,
		longitude,
		id_creator_user,
	}) {
		const client = await pool.connect();
		try {
			await client.query(
				'INSERT INTO public.event_locations(id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7);',
				[
					id_location,
					name,
					full_address,
					max_capacity,
					latitude,
					longitude,
					id_creator_user,
				],
			);
		} finally {
			client.release();
		}
	}

	async updateEventLocation({
		id,
		id_location,
		name,
		full_address,
		max_capacity,
		latitude,
		longitude,
		id_creator_user,
	}) {
		const client = await pool.connect();
		try {
			await client.query(
				'UPDATE event_locations SET id_location = $2, name = $3, full_address = $4, max_capacity = $5, latitude = $6, longitude = $7 WHERE id = $1 AND id_creator_user = $8',
				[
					id,
					id_location,
					name,
					full_address,
					max_capacity,
					latitude,
					longitude,
					id_creator_user,
				],
			);
		} finally {
			client.release();
		}
	}

	async deleteEventLocation(id) {
		const client = await pool.connect();
		const query = 'DELETE FROM event_locations WHERE id = $1';
		const values = [id];
		try {
			await client.query(query, values);
		} finally {
			client.release();
		}
	}
}
