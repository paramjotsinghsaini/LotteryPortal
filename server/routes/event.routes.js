const express = require('express');
const router = express.Router();
const { jwtAuth } = require("../middleware");
const eventController = require("../controllers/event.controller");

router.use(jwtAuth.verifyToken)
      .post(
        "/add", eventController.eventCreate
      )
      .get("/lottery", eventController.event);

module.exports = router