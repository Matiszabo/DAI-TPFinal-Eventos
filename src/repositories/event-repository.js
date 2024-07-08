import config from '../configs/db-config.js';
import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool(config);

export default class EventRepository {
	async getEvents({ name, category, startdate, tag }) {
		const client = await pool.connect();
		try {
			let query =
				'SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, ec.name AS category_name, ARRAY_AGG(t.name) AS tag_names FROM events AS e INNER JOIN event_categories AS ec ON e.id_event_category = ec.id LEFT JOIN event_tags AS et on e.id = et.id_event LEFT JOIN tags as t on t.id = et.id_tag';
			const values = [];
			const params = [];
			let cont = 1;
			if (name) {
				params.push(`lower(e.name) = lower($${cont})`);
				cont++;
				values.push(name);
			}
			if (category) {
				params.push(`lower(ec.name) = lower($${cont})`);
				cont++;
				values.push(category);
			}
			if (startdate) {
				params.push(`DATE(e.start_date) = DATE($${cont})`);
				cont++;
				values.push(startdate);
			}
			if (tag) {
				params.push(
					`e.id IN (SELECT id_event FROM event_tags WHERE id_tag = (SELECT id FROM tags WHERE lower(name) = lower($${cont})))`,
				);
				cont++;
				values.push(tag);
			}

			if (values.length > 0) {
				query += ' WHERE ' + params.join(' AND ');
			}

			query +=
				' GROUP BY e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, ec.name;';

			const result = await client.query(query, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getEventDetails(id) {
		const client = await pool.connect();
		try {
			let sql =
				"SELECT e.id, e.name, e.description, e.id_event_category, e.id_event_location, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, e.id_creator_user, json_build_object('id', el.id, 'id_location', el.id_location, 'name', el.name, 'full_address', el.full_address, 'max_capacity', el.max_capacity, 'latitude', el.latitude, 'longitude', el.longitude, 'id_creator_user', el.id_creator_user, 'location', json_build_object('id', l.id, 'name', l.name, 'id_province', l.id_province, 'latitude', l.latitude, 'longitude', l.longitude, 'province', json_build_object('id', p.id, 'name', p.name, 'full_name', p.full_name, 'latitude', p.latitude, 'longitude', p.longitude, 'display_order', p.display_order)), 'creator_user', (SELECT json_build_object('id', users.id, 'first_name', users.first_name, 'last_name', users.last_name, 'username', users.username, 'password', users.password) FROM users WHERE users.id = el.id_creator_user)) as event_location, array(SELECT json_build_object('id', t.id, 'name', t.name) FROM tags as t INNER JOIN event_tags as et on et.id_event = e.id and et.id_tag = t.id) as tags, (SELECT json_build_object('id', users.id, 'first_name', users.first_name, 'last_name', users.last_name, 'username', users.username, 'password', users.password) as creator_user FROM users WHERE users.id = e.id_creator_user), json_build_object('id', ec.id, 'name', ec.name, 'display_order', ec.display_order) as event_category FROM events as e INNER JOIN event_locations as el on el.id = e.id_event_location INNER JOIN locations as l on l.id = el.id_location INNER JOIN provinces as p on p.id = l.id_province INNER JOIN event_categories as ec on ec.id = e.id_event_category WHERE e.id = $1;";
			const values = [id];
			const result = await client.query(sql, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getEventLocation(id) {
		const client = await pool.connect();
		try {
			let sql = 'SELECT * FROM event_locations WHERE id = $1';
			const values = [id];
			const result = await client.query(sql, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getLocation(id) {
		const client = await pool.connect();
		try {
			let sql = 'SELECT * FROM locations WHERE id = $1';
			const values = [id];
			const result = await client.query(sql, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getProvince(id) {
		const client = await pool.connect();
		try {
			let sql = 'SELECT * FROM provinces WHERE id = $1';
			const values = [id];
			const result = await client.query(sql, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getEventTags(eventId) {
		const client = await pool.connect();
		try {
			let sql =
				'select t.id, t.name from event_tags as et inner join tags as t on t.id = et.id_tag WHERE et.id_event = $1;';
			const values = [eventId];
			const result = await client.query(sql, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getCreatorUser(id) {
		const client = await pool.connect();
		try {
			let sql = 'SELECT * FROM users WHERE id = $1';
			const values = [id];
			const result = await client.query(sql, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getEventCategory(id) {
		const client = await pool.connect();
		try {
			let sql = 'SELECT * FROM event_categories WHERE id = $1';
			const values = [id];
			const result = await client.query(sql, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getEnrollments(
		id,
		{ first_name, last_name, username, attended, rating },
	) {
		const client = await pool.connect();
		try {
			let query =
				'SELECT ee.id_event, u.first_name, u.last_name, u.username, ee.attended, ee.rating FROM users AS u INNER JOIN event_enrollments AS ee ON ee.id_user = u.id';
			const values = [];
			const params = [];
			let cont = 1;

			params.push(`ee.id_event = $${cont}`);
			cont++;
			values.push(id);

			if (first_name) {
				params.push(`lower(u.first_name) = lower($${cont})`);
				cont++;
				values.push(first_name);
			}
			if (last_name) {
				params.push(`lower(u.last_name) = lower($${cont})`);
				cont++;
				values.push(last_name);
			}
			if (username) {
				params.push(`lower(u.username) = lower($${cont})`);
				cont++;
				values.push(username);
			}
			if (attended) {
				params.push(`ee.attended = $${cont}`);
				cont++;
				values.push(attended);
			}
			if (rating) {
				params.push(`ee.rating = $${cont}`);
				cont++;
				values.push(rating);
			}

			if (values.length > 0) {
				query += ' WHERE ' + params.join(' AND ');
			}

			const result = await client.query(query, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getEnrollmentsId(id) {
		const client = await pool.connect();
		try {
			let sql =
				'SELECT u.first_name, u.last_name, u.username, ee.attended, ee.rating FROM users AS u INNER JOIN event_enrollments AS ee ON ee.id_user = u.id WHERE ee.id = $1';
			const result = await client.query(sql, [id]);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async addEvent(event, user_id) {
		const client = await pool.connect();
		try {
			let sql =
				'INSERT INTO public.events(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user, max_capacity)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);';
			const values = [
				event.name,
				event.description,
				event.id_event_category,
				event.id_event_location,
				event.start_date,
				event.duration_in_minutes,
				event.price,
				event.enabled_for_enrollment,
				event.max_assistance,
				user_id,
				event.max_capacity,
			];

			const result = await client.query(sql, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async updateEvent({
		id,
		name,
		description,
		max_assistance,
		max_capacity,
		price,
		duration_in_minutes,
	}) {
		const client = await pool.connect();
		try {
			const sql = `
			UPDATE events
			SET name = $1, description = $2, max_assistance = $3, max_capacity = $4, price = $5, duration_in_minutes = $6
			WHERE id = $7
		  `;
			const values = [
				name,
				description,
				max_assistance,
				max_capacity,
				price,
				duration_in_minutes,
				id,
			];
			await client.query(sql, values);
		} finally {
			client.release();
		}
	}

	async deleteEvent(eventId) {
		const client = await pool.connect();
		try {
			await client.query('DELETE FROM events WHERE id = $1', [eventId]);
		} finally {
			client.release();
		}
	}

	async addEnrollment(eventId, userId) {
		const client = await pool.connect();
		try {
			const sql = 'INSERT INTO event_enrollments (id_event, id_user) VALUES ($1, $2)';
			const values = [eventId, userId];
			await client.query(sql, values);
		} finally {
			client.release();
		}
	}

	async removeEnrollment(eventId, userId) {
		const client = await pool.connect();
		try {
			const sql =
				'DELETE FROM event_enrollments WHERE id_event = $1 AND id_user = $2';
			const values = [eventId, userId];
			await client.query(sql, values);
		} finally {
			client.release();
		}
	}

	async updateEnrollment(eventId, userId, rating, observations) {
		const client = await pool.connect();
		try {
			const sql = `
				UPDATE event_enrollments 
				SET rating = $1, observations = $2
				WHERE id_event = $3 AND id_user = $4
			`;
			const values = [rating, observations, eventId, userId];
			await client.query(sql, values);
		} finally {
			client.release();
		}
	}
}
