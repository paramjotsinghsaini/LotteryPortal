const config = require("../config/connection.js");

const Sequelize = require("sequelize");
const { user } = require("../config/connection.js");
//initializing sequelize
const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// create db object with all the table instances
User = require("./user.model")(sequelize, Sequelize);
Credit = require("./credits.model")(sequelize, Sequelize);
Events = require("./events.model")(sequelize, Sequelize);
Ticket = require("./ticket.model")(sequelize, Sequelize);
//user hasOne credits
// User.hasOne(Credit, { as: 'credits'});
//user hasMany ticket
// User.hasMany(Ticket);

//credits belongsTo user
// Credit.belongsTo(User);

// events hasMany tickets
// Events.hasMany(Ticket);

// ticket belongs to event
// Ticket.belongsTo(Events);
//ticket belings to user
// Ticket.belongsTo(User);


//Providing Welcome Credits to user
User.addHook('afterCreate', (user, options) => {
  Credit.create({
    user_id: user.id,
    amount: 1000
  })
  .then(credit => {
    if(!credit){
      res.status(500).send({ message: err.message });
      return;
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
});

Ticket.addHook('afterCreate', async (ticket, options) => {
  var entryFee = 0;
  var event = await Events.findByPk(ticket.eventId);
  entryFee = event.entryFee;
  var userCredits = 0;
  var credit = await Credit.findOne({
      where: {
          userId: ticket.userId
      }
  });
  userCredits = credit.amount;

  var final_credits = userCredits - entryFee;
  Credit.update(
    { amount: final_credits },
    { where: { userId: ticket.userId } }
  )
  .catch(err =>
    console.log(err)
  )
  
});
db.user = User;
db.credit = Credit;
db.event = Events;
db.ticket = Ticket;


module.exports = db;