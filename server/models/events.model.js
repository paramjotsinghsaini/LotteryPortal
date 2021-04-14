module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
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