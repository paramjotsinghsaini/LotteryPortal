const db = require("../models");
const Ticket = db.ticket;

checkMinParticipantRequirement = async (req, res, next) => {
    // check if lottery meet minimum requirement
    var event = await Events.findByPk(req.query.event_id);
    var tickets = await Ticket.findAll({ where: { eventId: req.query.event_id }, hierarchy: true });
    var participantsCount = tickets.length;
    if(participantsCount < event.minParticipants){
        tickets.forEach(async ticket => {
            var credit = await Credit.findOne({where: { userId: ticket.userId}});
            var returnCredit = credit.amount + event.entryFee;
            Credit.update(
                { amount: returnCredit },
                { where: { userId: ticket.userId } }
            )
        });
        await Ticket.destroy({where: {
                eventId: req.query.event_id 
            }
        });
        res.send({
            message: "Lottery didn't meet minimum participants requirement"
        });
        return;
    }
    next();
};

const participantsCheck = {
    checkMinParticipantRequirement: checkMinParticipantRequirement
};

module.exports = participantsCheck;