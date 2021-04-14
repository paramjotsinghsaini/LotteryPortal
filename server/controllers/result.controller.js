    const db = require("../models");
    const Ticket = db.ticket;
    const User = db.user;
    //event add route
    exports.getWinner = async (req, res) => {
        var tickets = await Ticket.findAll({ where: { eventId: req.query.event_id }, hierarchy: true });
        var keys = Object.keys(tickets);
        var winningTicket = tickets[keys[ keys.length * Math.random() << 0]];
        var winner = await User.findByPk(winningTicket.userId);
        
        res.send({message: "Result Declared", winningTicket: winningTicket, winner: winner});
        return;
    };