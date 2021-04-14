const { jwtAuth, verifyTicketPurchase, checkBalanceBeforePurchase } = require("../middleware");
const ticketController = require("../controllers/ticket.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/ticket/buy",
    [jwtAuth.verifyToken, checkBalanceBeforePurchase.checkBalance, verifyTicketPurchase.verifyTicket],
    ticketController.ticketCreate
  );
};