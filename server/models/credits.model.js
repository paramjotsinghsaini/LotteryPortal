module.exports = (sequelize, Sequelize) => {
    const Credit = sequelize.define("credit", {
        userId: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.INTEGER
        }
    });
    return Credit;
};