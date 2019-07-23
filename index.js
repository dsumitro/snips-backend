const Snippet = require('./models/Snippet.model');

async function testModels() {
  // const snippets = await Snippet.select();
  try {
    const newSnippet = await Snippet.insert({
      author: 'CJ',
      code: ' code, code, code',
      title: 'test.js',
      description: 'This works great!',
      language: 'Javascript',
    });
    console.log(newSnippet);
  } catch (err) {
    console.error(err);
  }
}

testModels();
