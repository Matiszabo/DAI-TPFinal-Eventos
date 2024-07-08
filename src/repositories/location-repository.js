import config from '../configs/db-config.js';
import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool(config);

export default class LocationRepository {
	async getLocations({ id }) {
		const client = await pool.connect();
		let query = 'SELECT * FROM locations';
		const params = [];
		const values = [];
		let cont = 1;

		if (id) {
			params.push(`id = $${cont}`);
			values.push(id);
			cont++;
		}

		if (params.length > 0) {
			query += ' WHERE ' + params.join(' AND ');
		}
		try {
			const result = await client.query(query, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getEventLocations(id) {
		const client = await pool.connect();
		const query = 'SELECT * FROM event_locations where id_location = $1';
		const values = [id];
		try {
			const result = await client.query(query, values);
			return result.rows;
		} finally {
			client.release();
		}
	}
}
