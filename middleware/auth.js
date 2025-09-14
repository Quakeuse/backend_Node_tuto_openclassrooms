const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // token is constituted for "BEARER <token>". See in Chrome / Network
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    req.auth = {
        userId: userId
    };
  } catch {
    res.status(401).json({ error });
    
  }
};