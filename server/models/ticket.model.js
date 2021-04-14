module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("tickets", {
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