const express = require('express');
const cors = require('cors');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');
const ErrorHandler = require('./middleware/errorHandler');

const app = express();

// .use signifies middleware
app.use(cors());
app.use(express.json()); // built in express function that parses requests with json payloads
app.use(logger);
app.use(router);
app.use(ErrorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log('Snips server running on port 5000');
});

// app.listen(5000, () => {
//   console.log('Servering running on port 5000');
// });

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
