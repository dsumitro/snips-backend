const format = require('pg-format');
const shortid = require('shortid');
const db = require('../db');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils');
const HTTPError = require('../utils/ErrorWithHttpStatus');
/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */

/* Create */
/**
 * Inserts a new snippet into the db.
 * @param {Snippet} newSnippet - the data to create the snippet with
 * @returns {Promise<Snippet>} - the created snippet
 */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language)
      throw new HTTPError('Missing properties', 400);
    const result = await db.query(
      `INSERT INTO snippet (code, title, description, author, language) VALUES ($1, $2, $3, $4, $5)RETURNING *`,
      [code, title, description, author, language]
    );
    return result.rows;
  } catch (err) {
    if (err instanceof HTTPError) throw err;
    else throw new HTTPError('Database error', 500);
  }
};

/* Read */
// can still run if there is no/empty query because default argument

/**
 * Selects snippets from db.
 * Can accept optional query object to filter results
 * @param {Object} [query]
 * @returns {Promise<Snippet[]>} array of Snippets
 * other wise returns all snippets
 */
exports.select = async query => {
  try {
    const clauses = Object.keys(query)
      .map((key, i) => `%I = $${i + 1}`)
      .join(' AND ');
    const formattedSelect = format(
      `SELECT * FROM snippet ${clauses.length ? `WHERE ${clauses}` : ''}`,
      ...Object.keys(query)
    );
    const result = await db.query(formattedSelect, Object.values(query));
    return result.rows;
  } catch (err) {
    if (err instanceof HTTPError) throw err;
    throw new HTTPError('Database Error', 500);
  }
};
/* Update */
/**
 * Updates a snippet
 * @param {string} id - id of the snippet to update
 * @param {Snippet} newData - subset of values to update
 */
exports.update = async (id, newData = {}) => {
  // 1.read in DB
  // TODO: Look in to coalesce to rid of the looping
  try {
    const { author, code, title, description, language } = newData;
    await db.query(
      `UPDATE snippets 
    SET 
      author = COALESCE($2, author),
      code = COALESCE($3, code),
      title = COALESCE($4, title),
      description = COALESCE($5, description),
      language=COALESCE($6, language)
    WHERE id = ($1)`,
      [id, author, code, title, description, language]
    );
    // Object.keys(newData).forEach(async key => {
    //   // console.log(key, newData[key]);
    //   await db.query(`UPDATE snippet SET ${key}=($1) WHERE id=($2)`, [
    //     newData[key],
    //     id,
    //   ]);
    // });
  } catch (err) {
    if (err instanceof HTTPError) throw err;
    throw new HTTPError('Database Error', 500);
  }
};

/**
 * Delete a snippet
 * @param {string} id - specific tag to delete
 * @returns {Promise<Snippet[]>} array of Snippets
 */
/* Delete */
exports.delete = async id => {
  try {
    const result = await db.query(`DELETE FROM snippet WHERE id= $1`, [id]);
    // checks if some number of rows were deleted
    if (result.rowCount === 0)
      throw new HTTPError(`Snippet with ID ${id} not found`, 404);
  } catch (err) {
    if (err instanceof HTTPError) throw err;
    throw new HTTPError('Database Error', 500);
  }
};
