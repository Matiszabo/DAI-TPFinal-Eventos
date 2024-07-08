import config from '../configs/db-config.js';
import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool(config);

export default class UserRepository {
	async getUser(username) {
		const client = await pool.connect();
		try {
			let sql = 'SELECT * FROM Users WHERE username = $1';
			const result = await client.query(sql, [username]);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getUsers() {
		const client = await pool.connect();
		try {
			let sql = 'SELECT * FROM Users';
			const result = await client.query(sql);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async addUser({ first_name, last_name, username, password }) {
		const client = await pool.connect();
		try {
			let sql =
				'INSERT INTO Users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)';
			await client.query(sql, [first_name, last_name, username, password]);
		} finally {
			client.release();
		}
	}
}
