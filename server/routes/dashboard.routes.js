const { jwtAuth } = require("../middleware");
const dashboardController = require("../controllers/dashboard.controller");

const express = require('express')
const router = express.Router()

router
      .use( jwtAuth.verifyToken )
      .get(
        "/dashboard", dashboardController.dashboard
      ).get("/credits", dashboardController.getCredits);

module.exports = router