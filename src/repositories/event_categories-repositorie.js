import DBConfig from './../configs/dbConfig.js';
import pkg from 'pg'
const { Client, Pool }  = pkg;

export default class event_categories {
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
                await client.connect();
                const sql = `SELECT * FROM event_categories`;
                const result = await client.query(sql);
                await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getByIdAsync = async (id) => {
        const sql = 'SELECT * from event_categories WHERE id=$1'; 
        const values = [id]; 
        const result = await 
        client.query(sql, values); await client.end(); 
        console.log('Resultados: length', result.rows.length); 
        console.log('result.rows[0]', result.rows[0]);
    }
    createAsync = async (entity) => {
        const sql = `INSERT INTO event_categories (name, display_order)
        VALUES ($1, $2)`;
        const values = ['futbol', 100];
        const result = await client.query(sql, values); 
        await client.end();
        console.log('rowCount: ', result.rowCount);
    }
    updateAsync = async (entity) => {
        console.log(`event_categories.updateAsync(${JSON.stringify(entity)})`);
        let 
        const sql = `UPDATE event_category
        SET  id = 34, name = Provincia Modificada, display_order = 100
        WHERE id = $1 `;
        const values = [ 
        id, //1
        emntity.name ?? previousEntity?.name,
        emntity.display_order ?? previousEntity?.display_order,
        ];
        const result = await client.query(sql, values);
    }
    deleteByIdAsync = async (id) => {
        console.log(`event_categories.deleteByIdAsync(${id})`);
        let rowsAffected = 0;
        try{
            const client = await this.getDBClient();
            const sql=`DELETE FROM provinces WHERE id = $1`;
            const values = [id];
            const result = await client.query(sql, values);
            rowsAffected = result.rowCount;
        }catch(error) {
            console.log(error);
        }
        return rowsAffected;
    }
}
