const Snippet = require('../models/Snippet.model');

exports.createSnippet = async (request, response) => {
  // 1. get data from Snippets model
  const newSnippet = await Snippet.insert(request.body);
  response.status(201).send(newSnippet);
};

exports.getAllSnippets = async (request, response) => {
  // 1. get data from Snippets model
  const snippets = await Snippet.select();
  // 2. send it out
  return response.send(snippets);
};
