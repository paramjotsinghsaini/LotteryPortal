    const db = require("../models");
    const Ticket = db.ticket;
    //event add route
    exports.ticketCreate = (req, res) => {
        var ticket_number = Math.floor(Math.pow(10, 11) + Math.random() * 9 * Math.pow(10, 11));
        console.log(req.query);
        Ticket.create({
            eventId: req.query.event_id,
            userId: req.userId,
            ticket: ticket_number
        })
        .then(ticket => {
            res.status(200).send({ message: "Ticket Generated Successfully", ticket: ticket});
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
    };