const express = require('express');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');

const app = express();

// .use signifies middleware
app.use(express.json()); // built in express function that parses requests with json payloads
app.use(logger);
app.use(router);

app.listen(5000, () => {
  console.log('Servering running on port 5000');
});

// const Snippet = require('./models/Snippet.model');

// async function testSnippetInsert() {
//   // const snippets = await Snippet.select();
//   try {
//     const newSnippet = await Snippet.insert({
//       author: 'DEAN',
//       code: ' entered on 7/25 8:21 am',
//       title: 'test.js',
//       description: 'works still!',
//       language: 'Javascript',
//     });
//     console.log(newSnippet);
//   } catch (err) {
//     console.error(err);
//   }
// }

// async function testSnippetSelect() {
//   const snippets = await Snippet.select();
//   console.log(snippets);
// }

// async function testSnippetDelete() {
//   return Snippet.delete('wqXeIxsaj');
// }
// testSnippetInsert();
// // testSnippetSelect();
// testSnippetDelete();
