import config from '../configs/db-config.js';
import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool(config);

export default class CategoryRepository {
	async getCategories({ id }) {
		const client = await pool.connect();
		let query = 'SELECT * FROM event_categories';
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

	async createCategory(data) {
		const client = await pool.connect();
		const query = 'INSERT INTO event_categories (name) VALUES ($1) RETURNING *';
		const values = [data.name];

		try {
			const result = await client.query(query, values);
			return result.rows[0];
		} finally {
			client.release();
		}
	}

	async updateCategory(data) {
		const client = await pool.connect();
		const query = 'UPDATE event_categories SET name = $1 WHERE id = $2 RETURNING *';
		const values = [data.name, data.id];

		try {
			const result = await client.query(query, values);
			return result.rowCount > 0 ? result.rows[0] : null;
		} finally {
			client.release();
		}
	}

	async deleteCategory(id) {
		const client = await pool.connect();
		const query = 'DELETE FROM event_categories WHERE id = $1 RETURNING *';
		const values = [id];

		try {
			const result = await client.query(query, values);
			return result.rowCount > 0 ? result.rows[0] : null;
		} finally {
			client.release();
		}
	}
}
