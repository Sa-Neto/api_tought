const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const createUserToken = (user, req, res) => {
  // create a token
  const token = jwt.sign({
    name: user.name,
    id: user.id,
  }, secret);

  res.status(201).json({
    message: 'Você está autenticado',
    token,
    userId: user._id,
  });
};

module.exports = createUserToken;
