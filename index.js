const Snippet = require('./models/Snippet.model');

async function testSnippetInsert() {
  // const snippets = await Snippet.select();
  try {
    const newSnippet = await Snippet.insert({
      author: 'DEAN',
      code: ' testing code',
      title: 'test.js',
      description: 'works still!',
      language: 'Javascript',
    });
    console.log(newSnippet);
  } catch (err) {
    console.error(err);
  }
}

async function testSnippetSelect() {
  const snippets = await Snippet.select();
  console.log(snippets);
}

async function testSnippetDelete() {
  return Snippet.delete('wqXeIxsaj');
}
// testSnippetInsert();
// testSnippetSelect();
testSnippetDelete();
