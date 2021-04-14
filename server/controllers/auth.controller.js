const db = require("../models");
const config = require("../config/auth");
const User = db.user;
const saltRounds = 10;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

  exports.signup = (req, res) => {
    // Save User to Database
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
      active: 1
    })
    .then(user => {
      res.status(200).send({ message: "Registered Successfully" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    })
  };

  exports.signin = (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken: token,
        // credits: credits.amount
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};