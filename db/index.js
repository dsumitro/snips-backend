require('dotenv').config();
const pg = require('pg');

// construct connection string
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
module.exports = pool;

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
