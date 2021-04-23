    const db = require("../models");
    const Ticket = db.ticket;
    const User = db.user;
    //event add route
    exports.getWinner = async (req, res) => {
        const tickets = await Ticket.findAll({ where: { eventId: req.query.event_id }, hierarchy: true });
        const keys = Object.keys(tickets);
        const winningTicket = tickets[keys[ keys.length * Math.random() << 0]];
        const winner = await User.findByPk(winningTicket.userId);
        const entryFee = 0;
        const participantsCount = keys.length;
        const event = await Lottery.findByPk(winningTicket.eventId);
        entryFee = event.entryFee;
        const userCredits = 0;
        const credit = await Credit.findOne({
            where: {
                userId: winningTicket.userId
            }
        });
        userCredits = credit.amount;

        const final_credits = userCredits + (entryFee * participantsCount);
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