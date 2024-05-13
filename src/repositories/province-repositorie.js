import DBConfig from './../configs/dbConfig.js';
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
        const sql = 'SELECT * from provinces WHERE id=$1'; 
        const values = [id]; 
        const result = await 
        client.query(sql, values); await client.end(); 
        console.log('Resultados: length', result.rows.length); 
        console.log('result.rows[0]', result.rows[0]);
    }
    createAsync = async (entity) => {
        const sql = `INSERT INTO provinces (name, full_name, latitude, longitude, display_order)
        VALUES ($1, $2, $3, $4, $5)`;
        const values = ['Jujuy', 'Provincia de Jujuy', -23.319974, -65.764427, 3];
        const result = await client.query(sql, values); await client.end();
        console.log('rowCount: ', result.rowCount);
    }
    updateAsync = async (entity) => {
        console.log(`ProvinceRepository.updateAsync(${JSON.stringify(entity)})`);
        let 
        const sql = `UPDATE provinces
        SET  id = 34, name = Provincia Modificada,full_name = Provincia Modificada, latitude = -24.895086288452148,longitude =-59.93218994140625, display_order = 100
        WHERE id = $1 `;
        const values = [ 
        id, //1
        emntity.name ?? previousEntity?.name,
        emntity.fullname ?? previousEntity?.fullname,
        emntity.latitude ?? previousEntity?.latitude,
        emntity.longitude ?? previousEntity?.longitude,
        emntity.display_order ?? previousEntity?.display_order,
        ];
        const result = await client.query(sql, values);
    }
    deleteByIdAsync = async (id) => {
        console.log(`ProvinceRepository.deleteByIdAsync(${id})`);
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
