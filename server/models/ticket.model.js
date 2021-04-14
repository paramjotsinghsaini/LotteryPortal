module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("tickets", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        eventId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        ticket: {
            type: Sequelize.STRING
        }
    });
  
    return Ticket;
};