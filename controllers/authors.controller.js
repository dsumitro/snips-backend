const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Author = require('../models/author.model');
const HTTPError = require('../utils/ErrorWithHttpStatus');

exports.signup = async (request, response, next) => {
  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(request.body.password, 2);
    await Author.insert({
      name: request.body.name,
      password: hashedPassword,
    });
    response.status(201).send('Signed Up!');
  } catch (err) {
    next(err);
  }
};

exports.login = async (request, response, next) => {
  try {
    // get author
    const author = await Author.select(request.body.name);
    // check if they exist
    if (!author) throw new HTTPError('User does not exist', 404);
    // check if passwords match

    const isMatch = await bcrypt.compare(
      request.body.password,
      author.password
    );
    if (!isMatch) throw new HTTPError('incorrect password', 401);
    const token = jwt.sign(author.name, process.env.JWT_SECRET);
    response.send({ message: 'Logged in', token });
  } catch (err) {
    next(err);
  }
};
