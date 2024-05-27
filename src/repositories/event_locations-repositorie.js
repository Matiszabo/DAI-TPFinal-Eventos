import DBConfig from '../configs/db-config.js';
import pkg from 'pg'
const { Client, Pool }  = pkg;

export default class EventRepository {
    getAllAsync = async (limit, offset) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM public.event_locations LIMIT $1 OFFSET $2`;
            const values = [limit, offset];
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getByIdAsync = async (id) => {
        let returnLoc = null;
        const client = new Client(DBConfig);
        await client.connect();
        try {
            const sql = `SELECT * FROM public.event_locations WHERE id = $1`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            returnLoc = result.rows;
        } catch (error) {
            console.log(error);
            returnLoc = null;
        }
        return returnLoc;
    }

    getByIdLocationAsync = async (limit, offset, id) => {
        let returnLoc = null;
        const client = new Client(DBConfig);
        await client.connect();
        try {
            const sql = `SELECT * FROM public.event_locations WHERE id_location = $3 LIMIT $1 OFFSET $2`;
            const values = [limit, offset, id];
            const result = await client.query(sql, values);
            await client.end();
            returnLoc = result.rows;
        } catch (error) {
            console.log(error);
            returnLoc = null;
        }
        return returnLoc;
    }

}