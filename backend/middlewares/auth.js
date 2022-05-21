const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

//Переделываю авторизацию на куки

//module.exports = (req, res, next) => {
//  const { authorization } = req.headers;

//  if (!authorization || !authorization.startsWith('Bearer ')) {
//    throw new UnauthorizedError('Необходима авторизация');
//  }

  //const token = authorization.replace('Bearer ', '');
  //let payload;

  //try {
  //  payload = jwt.verify(token, 'some-secret-key');
  //} catch (err) {
  //  return next(new UnauthorizedError('Необходима авторизация'));
 // }

  //req.user = payload; // записываем пейлоуд в объект запроса

  //next();
//};

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  if (!req.cookies.token) {
    next(new UnauthorizedError('Необходима авторизация'));
  } else {
    let payload;
    try {
      payload = jwt.verify(
        req.cookies.token,
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch(err) {
      next(new UnauthorizedError('Необходима авторизация'))
    }
    req.user = payload;
    next();
  }
};