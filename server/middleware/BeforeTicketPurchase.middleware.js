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

checkBalance = async (req, res, next) => {
    // check if user has sufficient balance
    var event = await Events.findByPk(req.query.event_id);
    var credit = await Credit.findOne({
        where: {
            userId: req.userId
        }
    });
    if(credit.amount < event.entryFee){
        res.send({
            message: "Insuffficient Balance"
        });
        return;
    }
    next();
};

const BeforeTicketPurchase = {
    checkBalance: checkBalance,
    verifyTicket: verifyTicket
};

module.exports = BeforeTicketPurchase;