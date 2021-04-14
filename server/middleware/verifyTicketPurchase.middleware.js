const db = require("../models");
const Ticket = db.ticket;

verifyTicket = (req, res, next) => {
    // checking if ticket is already purchased
    Ticket.findOne({
        where: {
            userId: req.userId,
            eventId: req.query.event_id
        }
    }).then(ticket => {
        if (ticket) {
            res.send({
                message: "Ticket Already Purchased"
            });
            return;
        }
        next();
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

const verifyTicketPurchase = {
    verifyTicket: verifyTicket
};

module.exports = verifyTicketPurchase;