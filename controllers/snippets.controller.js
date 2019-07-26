const Snippet = require('../models/Snippet.model');
const HTTPError = require('../utils/ErrorWithHttpStatus');

exports.createSnippet = async (request, response) => {
  // 1. get data from Snippets model
  try {
    const newSnippet = await Snippet.insert(request.body);
    response.status(201).send(newSnippet);
  } catch (err) {
    if (err instanceof HTTPError) {
      response.status(err.status).send(err.message);
    } else response.status(500).send('Server Error');
  }
};

exports.getAllSnippets = async ({ query }, response, next) => {
  try {
    // 1. get data from Snippets model
    const snippets = await Snippet.select(query);
    // 2. send it out
    return response.send(snippets);
  } catch (err) {
    next(err);
  }
};

exports.getSnippetById = async (request, response) => {
  // 1.get the data with Snippet.select() with the id from the request.params
  // for readability
  try {
    const { id } = request.params;
    const snippet = await Snippet.select({ id });
    if (snippet.length === 0) throw new HTTPError('ID does not exist!', 404); // 404s
    response.send(snippet[0]);
  } catch (err) {
    if (err instanceof HTTPError) {
      response.status(err.status).send(err.message);
    } else response.status(500).send('Server Error');
  }
  // one liner but not as clear
  // response.send(await Snippet.select(request.params))
};
