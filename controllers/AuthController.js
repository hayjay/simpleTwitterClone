const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err || !user) {
      return res.status(404).json({
        success: false,
        message: "Authentication failed. Invalid login credentials!" //to us, user record not found because we could'nt find the user email
      });
    }
    bcrypt.compare(req.body.password, user.password, function(err, response) {
      if (err || !response) {
        return res.status(404).json({
          success: false,
          message: "Authentication failed. Invalid login credentials!"
        });
      }
      let token_payload = { id: user._id, email: user.email };
      let token = jwt.sign(token_payload, process.env.JWT_KEY || "token", {
        expiresIn: "1h"
      });

      return res.status(200).json({
        success: true,
        message: "Authentication successfull!",
        token: token
      });
    });
  });
};

exports.register = (req, res) => {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user
    .validate()
    .then(() => {
      bcrypt.hash(req.body.password, parseInt(process.env.PASSWORD_SALT), (err, password) => {
        if (err) {
          return res
            .status(404)
            .json({
              success: false,
              message: "password is required!",
              err: err.message
            });
        }
        user.password = password;
        user.save(err => {
          if (err) {
            return res
              .status(404)
              .json({ success: false, message: err.message });
          }
          let token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_KEY || "token",
            { expiresIn: "1h" }
          );
          return res.status(200).json({ success: false, user, token });
        });
      });
    })
    .catch(error => {
      return res.status(404).json({ success: false, error: error.errors });
    });
};
