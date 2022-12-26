const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie || !cookie.startsWith('jwt=')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = cookie.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса.

  next(); // пропускаем запрос дальше.
};
