import DBConfig from './../configs/db-config.js';
import pkg from 'pg'
const { Client, Pool }  = pkg;

export default class ProvinceRepository {
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM provinces`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getByIdAsync = async (id) => {
        let returnProvince = null;
        console.log("Facu", id)
        const client = new Client(DBConfig);
        await client.connect();
        try {
            const sql = `SELECT * FROM provinces WHERE id = $1`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            returnProvince = result.rows;
        } catch (error) {
            console.log(error);
            returnProvince = 1;
        }
        return returnProvince;
    }

    createAsync = async (entity) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO provinces (
                name       , 
                full_name   ,
                latitude    ,
                longitude   ,
                display_order
            ) VALUES ($1,
                $2,
                $3,
                $4,
                $5)`;
            const values = [entity?.name    ??'',
            entity?.full_name    ??'',
            entity?.latitude    ??0,
            entity?.longitude    ??0,
            entity?.display_order    ??0
        ]
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    updateAsync = async (entity) => {
        let returnArray = null;
        let id = entity.id;
        const client = new Client(DBConfig);
        try {
            const previousEntity = await this.getByIdAsync(id)
            if (previousEntity == null) { return 0;}

            await client.connect();
            const sql = `UPDATE provinces SET
                name = $2, full_name = $3, latitude = $4, longitude = $5, display_order = $6
                WHERE id = $1
                `;
            const values = [
            entity?.id    ?? previousEntity?.id,
            entity?.name    ?? previousEntity?.name,
            entity?.full_name    ??previousEntity?.full_name,
            entity?.latitude    ??previousEntity?.latitude,
            entity?.longitude    ??previousEntity?.longitude,
            entity?.display_order    ??previousEntity?.display_order
        ]
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    deleteByIdAsync = async (id) => {
        let returnProvince = null;
        const client = new Client(DBConfig);
        await client.connect();
        try {
            const sql = `DELETE FROM provinces WHERE id = $1`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            returnProvince = result;
        } catch (error) {
            console.log(error);
            returnProvince = 1;
        }
        return returnProvince; 
    }
}