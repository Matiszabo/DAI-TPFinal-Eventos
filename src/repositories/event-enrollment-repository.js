import DBConfig from './../configs/db-config.js';
import pkg from 'pg';
const { Client } = pkg;

export default class EventEnrollmentRepository{
    getEnrollmentByEventId = async (id) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM event_enrollments WHERE id_event = $1`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rowCount;
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }
    getUserInEvent = async (eventId, userId) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM event_enrollments WHERE id_event = $1 AND id_user = $2`;
            const values = [eventId, userId];
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }
    enrollUser = async (eventId, userId) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
                INSERT INTO public.event_enrollments(
                id_event, id_user, description, registration_date_time, attended, observations, rating)
                VALUES ($1, $2, null, $3, '0', null, null); 
            `;
            const values = [eventId, userId, new Date()];
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }
    patchEnrollmentSync = async (params) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
                UPDATE event_enrollments
                SET observations = $3, rating = $2
                WHERE id_event = $1
            `;
            const values = [params[0], params[1], params[2]];
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }
    deleteEnrollment = async (eventId, userId) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
                DELETE FROM event_enrollments
                WHERE id_event = $1 AND id_user = $2
            `;
            const values = [eventId, userId];
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }
}