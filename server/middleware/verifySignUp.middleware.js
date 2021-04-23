const db = require("../models");
const User = db.user;

checkDuplicateAccount = (req, res, next) => {
    // checking is user already existing with this username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
        next();
    });
};

const verifySignUp = {
    checkDuplicateAccount: checkDuplicateAccount
};

module.exports = verifySignUp;