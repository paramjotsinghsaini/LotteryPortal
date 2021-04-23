const db = require("../models");
const Ticket = db.ticket;

checkMaxParticipant = async (req, res, next) => {
    // check if lottery meet minimum requirement
    const event = await Lottery.findByPk(req.query.event_id, {include: Ticket});
    console.log(event);
    const tickets = await Ticket.findAll({ where: { eventId: req.query.event_id }, hierarchy: true });
    const participantsCount = tickets.length;
    if(participantsCount == event.maxParticipants){
        
        res.send({
            message: "Lottery reached participants requirement"
        });
        return;
    }
    next();
};

const participantsCheck = {
    checkMinParticipantRequirement: checkMaxParticipant
};

module.exports = participantsCheck;