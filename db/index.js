require('dotenv').config();
const pg = require('pg');

// pick variables from ENV
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB } = process.env;
// construct connection string
const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB}`;
const pool = new pg.Pool({ connectionString });

// For Testing
// pool
//   .query(`SELECT * FROM snippet`)
//   .then(result => {
//     console.table(result.rows);
//   })
//   .catch(err => {
//     console.error(err);
//   })
//   .finally(() => {
//     pool.end();
//   });

module.exports = pool;
