import pg from 'pg';

const pool = new pg.Pool({
    host: 'localhost',
    database: 'TPfinal',
    user: 'postgres',
    password: 'root',
    port: 5432, 
});

export default pool;
