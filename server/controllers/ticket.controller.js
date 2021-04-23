    const db = require("../models");
    const Ticket = db.ticket;
    //event add route
    exports.ticketCreate = async (req, res) => {
        const ticket_number = Math.floor(Math.pow(10, 11) + Math.random() * 9 * Math.pow(10, 11));
        Ticket.create({
            eventId: req.query.event_id,
            userId: req.userId,
            number: ticket_number
        })
        .then(ticket => {
            res.status(200).send({ message: "Ticket Purchased Successfully", ticket: ticket});
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
    };
    exports.ticketCheck = async (req, res) => {
        console.log(req.query);
        const eventId = req.query.event_id;
        const userId = req.userId;
        const ticket = await Ticket.findOne({
            where: {
                eventId: eventId,
                userId: userId
            }
        });
        if(ticket)
        {
            return res.json({ flag: true});
        }
        return res.json( { flag: true });
    };