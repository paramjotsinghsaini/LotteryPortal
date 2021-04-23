const express = require('express');
const router = express.Router();

const { jwtAuth, beforeTicketPurchase  } = require("../middleware");

const ticketController = require("../controllers/ticket.controller");

router.use([jwtAuth.verifyToken])
      .get(
        "/buy", [beforeTicketPurchase.verifyTicket, beforeTicketPurchase.checkBalance], ticketController.ticketCreate
      )
      .get("/check", ticketController.ticketCheck);
module.exports = router