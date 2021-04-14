const db = require("../models");
const User = db.user;

checkDuplicateAccount = (req, res, next) => {
    console.log(req.body);
    // checking is user already existing with this email
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
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