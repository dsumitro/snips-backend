const fs = require('fs').promises;
// const path = require('path');
const shortid = require('shortid');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils');

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
      throw Error('Missing properties');

    // read snippets.json
    // path.join - saferway to creating paths
    // also checks to make sure people don't access directories they shouldn't
    const snippets = await readJsonFromDb('snippets');
    // grab data from newSnippet (validate)
    // generate default data (id, comments, favorites)
    // make newSnippet a proper object
    // push that object into snippets
    snippets.push({
      id: shortid.generate(),
      author,
      code,
      title,
      description,
      language,
      comments: [],
      favorites: 0,
    });
    await writeJsonToDb('snippets', snippets);
    return snippets[snippets.length - 1];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/* Read */
// can still run if there is no/empty query because default argument

/**
 * Selects snippets from db.
 * Can accept optional query object to filter results
 * @param {Object} [query]
 * @returns {Promise<Snippet[]>} array of Snippets
 */
exports.select = async (query = {}) => {
  try {
    // 1. read file
    // 2. parse
    // next two lines can be combined but kept separate for clarity atm
    const snippets = await readJsonFromDb('snippets');
    // filter data with query
    // check if every query key
    // snippet[key] = query[key]
    // snippet is an array
    // get the keys of the query into an array
    // we want every key/value to match
    // for every key, does the value in snippet at that key match
    // the value from the query
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => query[key] === snippet[key])
    );
    // 3. return data
    return filtered;
  } catch (err) {
    console.error('ERROR in Snippet model');
    throw err;
  }
};
/* Update */
exports.update = async (id, query = {}) => {
  // 1.read in DB
  // 2. located entry in DB
  // 3. change snippet[key] to query[key]
};

/* Delete */
exports.delete = async id => {
  try {
    // 1. Read in db
    const snippets = await readJsonFromDb('snippets');
    // 2. filter snippets for everything except snippet.id === id
    const filtered = snippets.filter(snippet => snippet.description !== id);
    // 3. write it back out
    return writeJsonToDb('snippets', filtered);
    // read snippets again because writeJsonToDb doesn't return anything
    // return readJsonFromDb('snippets');
  } catch (err) {
    console.error('ERROR in deleting snippet');
    throw err;
  }
};
