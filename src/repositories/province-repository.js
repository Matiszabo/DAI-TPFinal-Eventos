import config from '../configs/db-config.js';
import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool(config);

export default class ProvinceRepository {
	async getProvinces() {
		const client = await pool.connect();
		try {
			const sql = 'SELECT * FROM provinces';
			const result = await client.query(sql);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getProvinceById(id) {
		const client = await pool.connect();
		try {
			const sql = 'SELECT * FROM provinces WHERE id=$1';
			const result = await client.query(sql, [id]);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getLocationsByProvince(id) {
		const client = await pool.connect();
		try {
			const sql = 'select * from locations where id_province = $1';
			const result = await client.query(sql, [id]);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async addProvince({ name, full_name, latitude, longitude, display_order }) {
		const client = await pool.connect();
		try {
			const sql =
				'INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5)';
			await client.query(sql, [name, full_name, latitude, longitude, display_order]);
		} finally {
			client.release();
		}
	}

	async updateProvince(
		id,
		{ name, full_name, latitude, longitude, display_order },
	) {
		const client = await pool.connect();
		try {
			const sql =
				'UPDATE provinces SET name=$2, full_name=$3, latitude=$4, longitude=$5, display_order=$6 WHERE id=$1';
			const result = await client.query(sql, [
				id,
				name,
				full_name,
				latitude,
				longitude,
				display_order,
			]);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async deleteProvince(id) {
		const client = await pool.connect();
		try {
			const sql = 'DELETE FROM provinces WHERE id = $1';
			const values = [id];
			const result = await client.query(sql, values);
			return result.rows;
		} catch (error) {
			console.error('Error al eliminar la provincia:', error);
			throw new Error(
				'Error al procesar la solicitud. Inténtelo de nuevo más tarde.',
			);
		} finally {
			client.release();
		}
	}
}
