module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
        name: {
            type: Sequelize.STRING
        },
        entryFee: {
            type: Sequelize.INTEGER
        },
        minParticipants: {
            type: Sequelize.INTEGER
        },
        timer: {
            type: Sequelize.INTEGER
        }
    });
  
    return Event;
};