const fs = require('fs').promises;
const path = require('path');

function logger(request, response, next) {
  // append "method path timestamp" to log.txt
  // ex: GET / 232534534535
  // const filePath = path.join(__dirname, '..', 'log.txt');
  try {
    fs.appendFile(
      path.join(__dirname, '..', 'log.txt'),
      `Method: ${request.method}, Path: ${
        request.path
      } | TimeStamp: ${Date.now()}\n`
    );
  } catch (err) {
    console.error(err);
  } finally {
    next();
  }
  // next says, move onto the next piece of middleware
}
module.exports = logger;
