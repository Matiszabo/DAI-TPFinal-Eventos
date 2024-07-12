import config from '../configs/db-config.js';
import pkg from 'pg'
const {Client} = pkg 

export default class UserRepository {
    getAllAsync = async () => {
        let returnArray = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        } catch (error){
            console.log(error)
        }
        return returnArray;
    }

    getByIdAsync = async (id) => {
        let objeto = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM event_categories WHERE Id = $1'
            const values = [id]

            const result = await client.query(sql, values)
            await client.end()
            objeto = result.rows
        }catch (error){
            console.log(error)
        }
        return objeto;
    }

    createAsync = async (entity) => {
        let objeto = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'INSERT into users (first_name,last_name,username,password) VALUES ($1,$2,$3,$4)'
            const values = [entity.first_name,entity.last_name,entity.username,entity.password]

            const result = await client.query(sql, values)
            await client.end()
            objeto = result.rowCount
        }catch (error){
            console.log(error)
        }
        return objeto;
    }

    updateAsync = async (entity) => {
        let objeto = 0
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'UPDATE event_categories SET name = $1, display_order = $2 WHERE Id = $3'
            const values = [entity.name,entity.display_order, entity.id]

            const result = await client.query(sql, values)
            await client.end()
            objeto = result.rowCount
        }catch (error){
            console.log(error)
        }
        return objeto;
    }

    deleteByIdAsync = async (id) => {
        let objeto = null
        const client = new Client(config)
        try{
            await client.connect()
            let sql = 'DELETE FROM events WHERE id_event_category = $1'
            let values = [id]
            let result = await client.query(sql, values)

            sql = 'DELETE FROM event_categories WHERE Id = $1'
            values = [id]
            result = await client.query(sql, values)
            await client.end()

            objeto = result.rowCount
        }catch (error){
            console.log(error)
        }
        return objeto;
    }

    verifyAsync = async (username,password) => {
        let objeto = 0
        const client = new Client(config)
        try{
            await client.connect()
            const sql = `select * from users WHERE username = '${username}' AND password = '${password}'`

            const result = await client.query(sql)
            await client.end()
            objeto = result.rows[0]
        }catch (error){
            console.log(error)
        }
        return objeto;
    }

}