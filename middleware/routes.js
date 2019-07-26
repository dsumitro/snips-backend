/** What is a router?
 * its middleware
 * Req comes into a flow chain of middleware
 */

const express = require('express');
const snippets = require('../controllers/snippets.controller');

const router = express.Router();

router.get('/', (request, response) => {
  response.send('Welcome to Snips!');
});
router.get('/api', (request, response) => {
  response.send('Welcome to Snips API!');
});

/* Snippets routes */
// POST /snippets
router.post('/api/snippets', snippets.createSnippet);
// GET /snippets
router.get('/api/snippets', snippets.getAllSnippets);
// GET /snippets/:id
router.get('/api/snippets/:id', snippets.getSnippetById);
// PATCH /snippets/:id
router.patch('/api/snippets/:id', snippets.updateSnippet);
// DELETE /snippets/:id
router.delete('/api/snippets/:id', snippets.deleteSnippet);

module.exports = router;
