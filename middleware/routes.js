/** What is a router?
 * its middleware
 * Req comes into a flow chain of middleware
 */

const express = require('express');
const snippets = require('../controllers/snippets.controller');
const authors = require('../controllers/authors.controller');
const validate = require('./validate');

const router = express.Router();

router.get('/', (request, response) => {
  response.send('Welcome to Snips!');
});
router.get('/api', (request, response) => {
  response.send('Welcome to Snips API!');
});

/* Snippets routes */
// POST /snippets
router.post('/api/snippets', validate, snippets.createSnippet);
// GET /snippets
router.get('/api/snippets', snippets.getAllSnippets);
// GET /snippets/:id
router.get('/api/snippets/:id', snippets.getSnippetById);
// PATCH /snippets/:id
router.patch('/api/snippets/:id', validate, snippets.updateSnippet);
// DELETE /snippets/:id
router.delete('/api/snippets/:id', validate, snippets.deleteSnippet);

// Author routes

router.post('/api/signup', authors.signup);
router.post('/api/login', authors.login);
module.exports = router;
