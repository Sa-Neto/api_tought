const jwt = require('jsonwebtoken');
const getToken = require('./get-token');

const secret = process.env.JWT_SECRET;

// midleware to validation token
const checktoken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Acesso Negado' });
  }
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' });
  }
  try {
    const verify = jwt.verify(token, secret);
    req.user = verify;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Acesso Negado' });
  }
};
module.exports = checktoken;
