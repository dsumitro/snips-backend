const db = require('../db');
const HTTPError = require('../utils/ErrorWithHttpStatus');

exports.insert = ({ name, password }) => {
  try {
    if (!name || !password) {
      throw new HTTPError('Name or Password missing!', 400);
    }
    return db.query(`INSERT INTO author (name, password) VALUES ($1, $2)`, [
      name,
      password,
    ]);
  } catch (err) {
    if (err instanceof HTTPError) throw new HTTPError('Database error', 500);
  }
};

exports.select = async name => {
  try {
    const sql = `SELECT * FROM author WHERE name = $1`;
    const result = await db.query(sql, [name]);
    return result.rows[0];
  } catch (err) {
    throw new HTTPError('Database error', 500);
  }
};
