const express = require('express');
const router = express.Router();
const eventController = require("../controllers/event.controller");
const authController = require("../controllers/auth.controller");

router.get("/events/all", eventController.allEvents);
router.post("/signin", authController.signin);

module.exports = router