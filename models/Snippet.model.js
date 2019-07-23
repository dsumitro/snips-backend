const fs = require('fs').promises;
const path = require('path');

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
    const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbpath));
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
    console.log('ERROR in Snippet model');
    throw err;
  }
};
/* Update */

/* Delete */
