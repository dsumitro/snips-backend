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
    const result = await db.query(
      `INSERT INTO snippet (code, title, description, author, language)
    VALUES ($1, $2, $3, $4, $5)`,
      [code, title, description, author, language]
    );
    return result.rows;

    // if (!author || !code || !title || !description || !language)
    //   throw new HTTPError('Missing properties', 400);

    // // read snippets.json
    // // path.join - saferway to creating paths
    // // also checks to make sure people don't access directories they shouldn't
    // const snippets = await readJsonFromDb('snippets');
    // // grab data from newSnippet (validate)
    // // generate default data (id, comments, favorites)
    // // make newSnippet a proper object
    // // push that object into snippets
    // snippets.push({
    //   id: shortid.generate(),
    //   author,
    //   code,
    //   title,
    //   description,
    //   language,
    //   comments: [],
    //   favorites: 0,
    // });
    // await writeJsonToDb('snippets', snippets);
    // return snippets[snippets.length - 1];
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
exports.select = async (query = {}) => {
  try {
    const result = await db.query('SELECT * FROM snippet');
    return result.rows;

    // Old file-based method
    // // 1. read file
    // // 2. parse
    // // next two lines can be combined but kept separate for clarity atm
    // const snippets = await readJsonFromDb('snippets');
    // // filter data with query
    // // check if every query key
    // // snippet[key] = query[key]
    // // snippet is an array
    // // get the keys of the query into an array
    // // we want every key/value to match
    // // for every key, does the value in snippet at that key match
    // // the value from the query
    // const filtered = snippets.filter(snippet =>
    //   Object.keys(query).every(key => query[key] === snippet[key])
    // );
    // // TODO: fix this error handle
    // // if (snippets.length === filtered.length)
    // //   throw new HTTPError('Invalid Query Properties', 500);
    // // 3. return data
    // return filtered;
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
  // TODO: Look in to coalesce
  try {
    Object.keys(newData).forEach(async key => {
      // console.log(key, newData[key]);
      await db.query(`UPDATE snippet SET ${key}=($1) WHERE id=($2)`, [
        newData[key],
        id,
      ]);
      // throw new HTTPError('Could not update! Property not Found', 404);
    });
    // const snippets = await readJsonFromDb('snippets');
    // if (snippets.every(snippet => snippet.id !== id))
    //   throw new HTTPError('Could not update! ID not found', 404);
    // // 2. located snippet with id by map
    // const updatedSnippets = snippets.map(snippet => {
    //   // if its not the one we want, just return
    //   if (snippet.id !== id) return snippet;
    //   // 3. update snippet with approriate data (make sure to validate)
    //   Object.keys(newData).forEach(key => {
    //     // checks if the target snippet has the key being updated
    //     if (key in snippet) snippet[key] = newData[key];
    //     else throw new HTTPError('Could not update! Property not Found', 404);
    //   });
    //   return snippet;
    // });
    // // 4. write back to db
    // return writeJsonToDb('snippets', updatedSnippets);
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
    // Old File-based metnhod
    //   // 1. Read in db
    //   const snippets = await readJsonFromDb('snippets');
    //   if (snippets.every(snippet => snippet.id !== id))
    //     throw new HTTPError('Could not delete! ID not found', 404);
    //   // 2. filter snippets for everything except snippet.id === id
    //   const filtered = snippets.filter(snippet => snippet.id !== id);
    //   if (snippets.length === filtered.length) return;
    //   // TODO: Error if trying to delete snippet that DNE
    //   // 3. write it back out
    //   return writeJsonToDb('snippets', filtered);
    //   // read snippets again because writeJsonToDb doesn't return anything
    //   // return readJsonFromDb('snippets');
    if (err instanceof HTTPError) throw err;
    throw new HTTPError('Database Error', 500);
  }
};
