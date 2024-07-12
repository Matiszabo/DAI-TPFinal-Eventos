import DBConfig from './../configs/db-config.js';
import pkg from 'pg';
const { Client } = pkg;

export default class CommonRepository{
    getAllSync = async (table_name) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM ${table_name}`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        }
        catch (error){
            console.log(error);
        }
        return returnArray;
    }
    getByIdSync = async (table_name, id) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM ${table_name} WHERE id = $1`;
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
    deleteByIdAsync = async (table_name, id) => {
        let rowsAffected = 0;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `DELETE FROM ${table_name} WHERE id = $1`;
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