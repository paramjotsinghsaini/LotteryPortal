const express = require('express');
const router = express.Router();
const { jwtAuth, participantsCheck  } = require("../middleware");
const resultController = require("../controllers/result.controller");

router.use([jwtAuth.verifyToken, participantsCheck.checkMinParticipantRequirement])
      .get(
        "/", resultController.getWinner
      );

module.exports = router