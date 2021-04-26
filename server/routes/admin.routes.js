const { jwtAuth } = require("../middleware");
const adminController = require("../controllers/admin.controller");

const express = require('express')
const router = express.Router()

router
      .use( jwtAuth.verifyToken )
      .get("/delete/user",          adminController.deleteUser)
      .get("/delete/lottery",       adminController.deleteLottery)
      .get("/user",                 adminController.getUser)
      .get("/lottery",              adminController.getLottery)
      .post("/user/submit",         adminController.saveOrUpdateUser)
      .post("/lottery/submit",      adminController.saveOrUpdateLottery)
      .post("/credit/update",       adminController.updateCredits);

module.exports = router