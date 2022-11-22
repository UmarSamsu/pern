import pg from 'pg';

export const todoPool = new pg.Pool({
    user: 'postgres',
    password: 'p@ssw0rd',
    host: 'localhost',
    port: 5432,
    database: 'pern' //database name not table name 
})

export const usersPool = new pg.Pool({
    user: 'postgres',
    password: 'p@ssw0rd',
    host: 'localhost',
    port: 5432,
    database: 'pern'
})