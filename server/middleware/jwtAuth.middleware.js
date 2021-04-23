const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
verifySocket = (socket) => {
  if (socket.handshake.query && socket.handshake.query.token){
    jwt.verify(socket.handshake.query.token, config.secret, (err, decoded) => {
      if(err) return new Error('Authentication error');
      socket.userId = decoded.id;
    });
  }
  else {
    return new Error('Authentication error');
  }

};
const jwtAuth = {
  verifyToken: verifyToken,
  verifySocket: verifySocket
};
module.exports = jwtAuth;