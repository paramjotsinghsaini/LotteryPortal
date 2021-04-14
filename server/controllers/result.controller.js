    const db = require("../models");
    const Ticket = db.ticket;
    const User = db.user;
    //event add route
    exports.getWinner = async (req, res) => {
        var tickets = await Ticket.findAll({ where: { eventId: req.query.event_id }, hierarchy: true });
        var keys = Object.keys(tickets);
        var winningTicket = tickets[keys[ keys.length * Math.random() << 0]];
        var winner = await User.findByPk(winningTicket.userId);
        var entryFee = 0;
        var participantsCount = keys.length;
        var event = await Events.findByPk(winningTicket.eventId);
        entryFee = event.entryFee;
        var userCredits = 0;
        var credit = await Credit.findOne({
            where: {
                userId: winningTicket.userId
            }
        });
        userCredits = credit.amount;

        var final_credits = userCredits + (entryFee * participantsCount);
        Credit.update(
            { amount: final_credits },
            { where: { userId: winningTicket.userId } }
        )
        .catch(err =>
            console.log(err)
        )
        await Ticket.destroy({where: {
             eventId: req.query.event_id 
          }
        });
        res.send({message: "Result Declared", winningTicket: winningTicket, winner: winner});
        return;
    };