const db = require("../models");
const User = db.user;
const Lottery = db.lottery;
const Sequelize = db.Sequelize;
const saltRounds = 10;
const bcrypt = require("bcrypt");

  exports.deleteUser = async (req, res) => {
    const user = await User.destroy({
        where:{
            id: req.query.userId
        }
    });
    return res.json({message: "Deleted Successfully"});
  };
  exports.deleteLottery = async (req, res) => {
    const lottery = await Lottery.destroy({
        where:{
            id: req.query.eventId
        }
    });;
    return res.json({message: "Deleted Successfully"});
  };
  exports.getUser = async (req, res) => {
    const user = await User.findByPk(req.query.userId, { include: Credit });
    return res.json(user);
  };
  exports.getLottery = async (req, res) => {
    const lottery = await Lottery.findByPk(req.query.eventId);
    return res.json(lottery);
  };
  exports.saveOrUpdateUser = async (req, res) => {
      console.log(req.body)
    const user = await User.findOne({
        where: {name: req.body.fullname, username: req.body.username}
    });
    if(req.body.password)
    {
        var password = bcrypt.hashSync(req.body.password, saltRounds);
    }
    if(user)
    {
        user.update({name: req.body.fullname, username: req.body.username});
        return res.json({message: "Successfully Updated"});
    }
    else{
        User.create({name: req.body.fullname, username: req.body.username, password: password});
        return res.json({message: "Successfully Created"});
    }
  };
  exports.saveOrUpdateLottery = async (req, res) => {
    const lottery = await Lottery.findOne({
        where: {
            name: req.body.name, entryFee: req.body.entryFee, maxParticipants: req.body.maxParticipants
        }
    });
    if(lottery)
    {
        lottery.update({name: req.body.name, entryFee: req.body.entryFee, maxParticipants: req.body.maxParticipants});
        return res.json({message: "Successfully Updated"});
    }
    else{
        Lottery.create({name: req.body.name,  entryFee: req.body.entryFee, maxParticipants: req.body.maxParticipants});
        return res.json({message: "Successfully Created"});
    }
  };
  exports.updateCredits = async (req, res) => {
    const credit = await Credit.findOne({
        where: {
            userId: req.body.userId
        }
    });
    console.log(req.body)
    if(credit)
    {
      await Credit.update({amount: req.body.amount},{
        where: {
          userId: req.body.userId
        }
      });
      return res.json({message: "Credits Successfully Updated"});
    }
  };
