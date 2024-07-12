import DBConfig from './../configs/db-config.js';
import pkg from 'pg';
const { Client } = pkg;

export default class EventRepository{
    /**
     * Devuelve los detalles de un evento por id
     * @param {} id  ID del evento a buscar
     * @returns 
     */
    
    getByIdSync = async (id) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT 
            json_build_object(
                'id', e.id,
                'name', e.name,
                'description', e.description,
                'event_category', json_build_object(
                    'id', ec.id,
                    'name', ec.name
                ),
                'event_location', json_build_object(
                    'id', el.id,
                    'name', el.name,
                    'full_address', el.full_address,
                    'max_capacity', el.max_capacity,
                    'latitude', el.latitude,
                    'longitude', el.longitude,
                    'location', json_build_object(
                        'id', l.id,
                        'name', l.name,
                        'latitude', l.latitude,
                        'longitude', l.longitude,
                        'province', json_build_object(
                            'id', pr.id,
                            'name', pr.name,
                            'full_name', pr.full_name,
                            'latitude', pr.latitude,
                            'longitude', pr.longitude,
                            'display_order', pr.display_order
                        )
                    )
                ),
                'start_date', e.start_date,
                'duration_in_minutes', e.duration_in_minutes,
                'price', e.price,
                'enabled_for_enrollment', e.enabled_for_enrollment,
                'max_assistance', e.max_assistance,
                'creator_user', json_build_object(
                    'id', u.id,
                    'username', u.username,
                    'first_name', u.first_name,
                    'last_name', u.last_name
                ),
                'tags', (
                    SELECT json_agg(json_build_object('id', tags.id, 'name', tags.name)) 
                    FROM tags 
                    JOIN event_tags et ON tags.id = et.id_tag 
                    WHERE et.id_event = e.id
                )
            ) as event
            FROM events e
            INNER JOIN event_categories ec ON e.id_event_category = ec.id
            INNER JOIN event_locations el ON e.id_event_location = el.id
            INNER JOIN locations l ON el.id_location = l.id
            INNER JOIN provinces pr ON l.id_province = pr.id
            INNER JOIN users u ON e.id_creator_user = u.id
            WHERE e.id = $1;`;

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

    /**
     * Devuelve los detalles de un evento que tenga los requisitos de los parametros.
     * @param {} params Vector con parametros (nombre del evento, categoria, inicio, tag)
     * @returns 
     */

    getSearchSync = async (params) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        const adds = ['e.name', 'ec.name', 'e.start_date', 't.name']
        console.log(params);
        try {
            await client.connect();
            let sql = `
            SELECT 
            json_agg(json_build_object(
                'id', e.id,
                'name', e.name,
                'description', e.description,
                'event_category', json_build_object(
                    'id', ec.id,
                    'name', ec.name
                ),
                'event_location', json_build_object(
                    'id', el.id,
                    'name', el.name,
                    'full_address', el.full_address,
                    'max_capacity', el.max_capacity,
                    'latitude', el.latitude,
                    'longitude', el.longitude,
                    'location', json_build_object(
                        'id', l.id,
                        'name', l.name,
                        'latitude', l.latitude,
                        'longitude', l.longitude,
                        'province', json_build_object(
                            'id', pr.id,
                            'name', pr.name,
                            'full_name', pr.full_name,
                            'latitude', pr.latitude,
                            'longitude', pr.longitude,
                            'display_order', pr.display_order
                        )
                    )
                ),
                'start_date', e.start_date,
                'duration_in_minutes', e.duration_in_minutes,
                'price', e.price,
                'enabled_for_enrollment', e.enabled_for_enrollment,
                'max_assistance', e.max_assistance,
                'creator_user', json_build_object(
                    'id', u.id,
                    'username', u.username,
                    'first_name', u.first_name,
                    'last_name', u.last_name
                ),
                'tags', (
                    SELECT json_agg(json_build_object('id', tags.id, 'name', tags.name)) 
                    FROM tags 
                    JOIN event_tags et ON tags.id = et.id_tag 
                    WHERE et.id_event = e.id
                )
            ))
            FROM events e
            INNER JOIN event_categories ec ON e.id_event_category = ec.id
            INNER JOIN event_locations el ON e.id_event_location = el.id
            INNER JOIN locations l ON el.id_location = l.id
            INNER JOIN provinces pr ON l.id_province = pr.id
            INNER JOIN users u ON e.id_creator_user = u.id
            INNER JOIN event_tags et ON e.id = et.id_event
            INNER JOIN tags t ON et.id_tag = t.id 
            `;
            let values = [];
            
            adds.forEach((add, index) => {
                if(params[index] != null){
                    values.push(params[index]);
                    if (values.length == 1){sql += ' WHERE '}
                    sql += `${add} = $${values.length}`;
                    if (index < adds.length - 1) {
                        sql += ' AND ';
                    }
                }
            });
            if (sql.endsWith(' AND ')){sql = sql.slice(0, -5)}
            console.log(sql);
            console.log(values);
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }

    getEnrollmentById = async (id, params) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        console.log(params);
        const adds = ['u.first_name', 'u.last_name', 'u.username', 'er.attended', 'er.rating'];
        try {
            await client.connect();
            let sql = `
                SELECT
                    er.id,
                    er.id_event,
                    er.id_user,
                    json_build_object(
                        'user', u.id,
                        'first_name', u.first_name,
                        'last_name', u.last_name,
                        'username', u.username,
                        'password', u.password
                    ),
                    er.description,
                    er.registration_date_time,
                    er.attended,
                    er.observations,
                    er.rating
                FROM event_enrollments er
                INNER JOIN users u ON er.id_user = u.id
                INNER JOIN events e ON er.id_event = e.id
                WHERE er.id_event = $1
            `;
            
            let values = [id];
            
            adds.forEach((add, index) => {
                if(params[index] != null){
                    values.push(params[index]);
                    sql += ` AND ${add} = $${values.length}`;
                }
            });
            if (sql.endsWith(' AND ')){sql = sql.slice(0, -5)}
            console.log(sql);
            console.log(values);

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
                INSERT INTO events
                    (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `;
            const values = [entity.name, entity.description, entity.id_event_category, entity.id_event_location, entity.start_date, entity.duration_in_minutes, entity.price, entity.enabled_for_enrollment, entity.max_assistance, entity.id_creator_user];
            const result = await client.query(sql, values);
            await client.end();
            rowsAffected = result.rowCount;
        }
        catch (error){
            console.log(error);
        }
        await client.end();
        return rowsAffected;
    }

    updateAsync = async (entity) => {
        let rowsAffected = 0;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
                UPDATE events
                SET name = $1, description = $2, id_event_category = $3, id_event_location = $4, start_date = $5, duration_in_minutes = $6, price = $7, enabled_for_enrollment = $8, max_assistance = $9, id_creator_user = $10 
                WHERE id = $11
            `;
            const values = [entity.name, entity.description, entity.id_event_category, entity.id_event_location, entity.start_date, entity.duration_in_minutes, entity.price, entity.enabled_for_enrollment, entity.max_assistance, entity.id_creator_user, entity.id];
            const result = await client.query(sql, values);
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
            const sql = 'DELETE FROM events WHERE id = $1';
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