module.exports = (sequelize, Sequelize) => {
    const Credit = sequelize.define("credits", {
        userId: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.INTEGER
        }
    });
    return Credit;
};