import config from "../configs/db-configs.js";

class LocationRepository {
    async getAll() {
        const client = await config.connect();
        try {
            const result = await client.query('SELECT * FROM locations');
            return result.rows;
        } finally {
            client.release();
        }
    }

    async getById(id) {
        const client = await config.connect();
        try {
            const result = await client.query('SELECT * FROM locations WHERE id = $1', [id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    }

    async getEventLocationsByLocationId(id) {
        const client = await config.connect();
        try {
            const result = await client.query('SELECT * FROM event_locations WHERE location_id = $1', [id]);
            return result.rows;
        } finally {
            client.release();
        }
    }
}

export default LocationRepository;
