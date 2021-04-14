module.exports = (sequelize, Sequelize) => {
    const Credit = sequelize.define("credits", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.INTEGER
        }
    });
    return Credit;
};