const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

const express = require('express')
const router = express.Router()

router
      .use(verifySignUp.checkDuplicateAccount)
      .post(
        "/register", controller.signup
      );

module.exports = router