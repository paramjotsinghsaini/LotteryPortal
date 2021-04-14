const db = require("../models");
const Ticket = db.ticket;

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

const checkBalanceBeforePurchase = {
    checkBalance: checkBalance
};

module.exports = checkBalanceBeforePurchase;