module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        active: {
            type: Sequelize.INTEGER
        }
    });
  
    return User;
};