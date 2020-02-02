const jwt = require("jsonwebtoken");
const User = require("../models/User")

const authenticateUsers = (req, res, next) => {
  var token =
    req.body._token || req.query._token || req.headers["authorization"];

  if (token) {
    jwt.verify(token, process.env.JWT_KEY || "token", function(err, decoded) {
      if (err) {
        return res.status(404).json({
          success: false,
          message: "Failed to authenticate token.",
          err: err.message
        });
      }

      req.decoded = decoded;
      User.findById(decoded.id, (err, user) => {
        if (err || !user) {
          return res.status(404).json({
            success: false,
            message: "Failed to authenticate token."
          });
        }
        //if token's successfully validated i.e user sent correct token
        //then we append the user object to request object
        req.user = user;
        //and then allow the user to proceed with the intended action using the next func
        next();
      });
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
};

module.exports = authenticateUsers;
