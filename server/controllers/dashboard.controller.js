const db = require("../models");
const User = db.user;
const Sequelize = db.Sequelize;

  exports.getCredits = async (req, res) => {
    const credit = await Credit.findOne({
        where: {
            userId: req.userId
        },
    });
    return res.json(credit);
  };

  exports.dashboard = async (req, res) => {
    
    const lottery = await Lottery.findAll(
                        {
                            include: [{
                                model: Ticket,
                                include: {
                                    model: User
                                }
                              }]
                        }
                    ).catch(err => {
                        console.log(err.message);
                    });

    return res.json(
                        {
                            lottery
                        }
                    );
  };
