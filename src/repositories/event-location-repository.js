import DBConfig from './../configs/db-config.js';
import pkg from 'pg';
import ValidationHelper from '../helpers/validation-helper.js';
const { Client } = pkg;

export default class EventLocationRepository{
    getAllSync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_locations';
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        }
        catch (error){
            console.log(error);
        }
        return returnArray;
    }
    getByIdSync = async (id) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_locations WHERE id=$1'
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }
    createAsync = async (entity) => {
        let rowsAffected = 0;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
                INSERT INTO event_locations
                    (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7)
            `;
            const values = [entity.id_location, entity.name, entity.full_address, entity.max_capacity, entity.latitude, entity.longitude, entity.id_creator_user];
            const result = await client.query(sql, values);
            await client.end();
            rowsAffected = result.rowCount;
        }
        catch (error){
            console.log(error);
            await client.end();
        }
        return rowsAffected;
    }
    updateAsync = async (entity) => {
        let rowsAffected = 0;
        const client = new Client(DBConfig);
        console.log('repo object', entity);
        try {
            await client.connect();
            const sql = `
                UPDATE event_locations
                SET id_location = $2, name = $3, full_address = $4, max_capacity = $5, latitude = $6, longitude = $7, id_creator_user = $8
                WHERE id = $1
            `;
            console.log(entity.name);
            const values = [entity.id, entity.id_location, entity.name, entity.full_address, entity.max_capacity, entity.latitude, entity.longitude, entity.id_creator_user];
            console.log(values);
            const result = await client.query(sql, values);
            console.log('query made');
            await client.end();
            rowsAffected = result.rowCount;
        }
        catch (error){
            console.log(error);
        }
        await client.end();
        return rowsAffected;
    }
    deleteByIdAsync = async (id) => {
        let rowsAffected = 0;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM event_locations WHERE id = $1';
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();

            rowsAffected = result.rowCount;
        }
        catch (error){
            console.log(error);
        }
        return rowsAffected;
    }
}