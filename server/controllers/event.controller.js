    const db = require("../models");
    const Event = db.event;
    //event add route
    exports.eventCreate = (req, res) => {
        console.log(req.body);
        Event.create({
            name: req.body.name,
            entry_fee: req.body.entry_fee,
            min_participants: req.body.participants,
            timer: req.body.timer
        })
        .then(event => {
            res.status(200).send({ message: "Event Added Successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
    };