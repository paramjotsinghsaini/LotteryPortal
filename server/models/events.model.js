module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
        name: {
            type: Sequelize.STRING
        },
        entryFee: {
            type: Sequelize.INTEGER
        },
        maxParticipants: {
            type: Sequelize.INTEGER
        },
        timer: {
            type: Sequelize.INTEGER
        },
        img: {
            type: Sequelize.STRING
        }
    });
  
    return Event;
};