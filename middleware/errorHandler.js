const HTTPError = require('../utils/ErrorWithHttpStatus');

const errorHandler = (err, request, response, next) => {
  if (err instanceof HTTPError) {
    response.status(err.status).send(err.message);
  } else response.status(500).send('Server Error');
};
module.exports = errorHandler;
