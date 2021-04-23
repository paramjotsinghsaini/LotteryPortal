const { user } = require("../models");
const db = require("../models");
    const Lottery = db.lottery;
    const Sequelize = db.Sequelize;
    //event add route
    exports.eventCreate = (req, res) => {
        Lottery.create({
            name: req.body.name,
            entry_fee: req.body.entry_fee,
            min_participants: req.body.participants,
            timer: req.body.timer
        })
        .then(event => {
            res.status(200).send({ message: "Lottery Added Successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
    };
    exports.allEvents = async (req, res) => {
        const lottery = await Lottery.findAll(
                                                {
                                                    hierarchy:true,
                                                    include: [{
                                                        model: Ticket,
                                                        include: {
                                                            model: User
                                                        }
                                                    }]
                                                }
                                            );
        if(lottery){
            return res.json( {
                lottery
            });
        }
    }
    exports.event = async (req, res) => {
        console.log(req.query.event_id);
        const lottery = await Lottery.findByPk(req.query.event_id,
                                                    {
                                                        attributes: { 
                                                            include: [
                                                                [ Sequelize.fn("COUNT", Sequelize.col("tickets.id")), "participantsCount"]
                                                            ] 
                                                        },
                                                        include: [
                                                                    {
                                                                        model: Ticket, attributes: [],
                                                                        include: {
                                                                            model: user,
                                                                        }
                                                                    }
                                                                ]
                                                    }
                                                );
        if(lottery){
            return res.json(lottery);
        }
    }