const { jwtAuth } = require("../middleware");
const db = require("../models");
const Credit = db.credit;
const Lottery = db.lottery;
const User = db.user;

const getCredits = async (socket, userId) => {
    await Credit.findOne({
        where: {
            userId: userId
        }
    }).then((credit) => {
        socket.emit('Credits', credit);
    })
    .catch((err) => console.log(err.message));
};

const getUserList = async (socket) => {
    await User.findAll({
                where:{
                    isAdmin: 0
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                include: Credit
            })
            .then((users) => {
                socket.emit('UserList', { users: users });
            })
            .catch((err) => console.log(err.message));
}
const getEventList = async (socket) => {
    await Lottery.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                include: Ticket
            })
            .then((lotteries) => {
                socket.emit('LotteryList', { lotteries: lotteries });
            })
            .catch((err) => console.log(err.message));
}

const getTicket = async (socket, eventId, userId) => {
    await Ticket.findOne({
        where: {
            eventId: eventId,
            userId: userId
        }
    }).then((ticket) => {
        var flag = false;
        if(ticket)
        {
            flag = true;
        }
        socket.emit('ticketPurchased', {flag: flag});
    })
    .catch((err) => console.log(err.message));
};

const getParticipants = async (socket, eventId) => {
    await Lottery.findByPk(eventId, {
        include: Ticket
    }).then((lottery) => {
        if(lottery && lottery.tickets){
            const currentParticipants = lottery.tickets.length;
            socket.emit('currentParticipants', {count: currentParticipants});
            if(currentParticipants === lottery.maxParticipants)
            {
                socket.emit('startTimer', {start: true});
            }
        }
    })
    .catch((err) => console.log(err.message));
};

const getWinner = async (socket, eventId) => {
    const lottery = await Lottery.findByPk(eventId);
    const tickets = await Ticket.findAll({ where: { eventId: eventId }, hierarchy: true });
    const keys = Object.keys(tickets);
    const winningTicket = tickets[keys[ keys.length * Math.random() << 0]];
    const winner = await User.findByPk(winningTicket.userId);
    var userCredits = 0;
    const entryFee = lottery.entryFee;
    const credit = await Credit.findOne({
        where: {
            userId: winner.id
        }
    });
    userCredits = credit.amount;
    const final_credits = userCredits + (entryFee * 5);
    Credit.update(
        { amount: final_credits },
        { where: { userId: winner.id } }
    )
    .catch(err =>
        console.log(err)
    )
    await Ticket.destroy({where: {
            eventId: eventId 
        }
    });
    const message = "You Lose. Better Luck Next Time";
    if(winner.id === socket.userId){
        message = "Congratulations! You Won";
    }
    const result = {
                        lottery: lottery,
                        winningTicket: winningTicket,
                        winner: winner,
                        message: message
                    };
    socket.emit("winnerDeclared", {result: result});

}

const mainSocket = (io) => {
    var allClients = [];    
    io
    .use((socket, next) => {
        next(jwtAuth.verifySocket(socket, next));
    })
    .on('connection', (socket) => { 
        allClients.push(socket);
        // console.log("New client connected");
        socket.on('user', data => {
            getCredits(socket, data.userId);
        })
        .on("checkParticipants", (data) => {
            if(data && data.eventId)
            {
                getParticipants(socket, data.eventId);
            }
        })
        .on("getWinner", (data) => {
            if(data && data.eventId)
            {
                getWinner(socket, data.eventId);
            }
        })
        .on("ticketPurchased", (data) => {
            if(data && data.eventId && data.userId)
            {
                getTicket(socket, data.eventId, data.userId);
            }
        })
        .on('getUsers', () => {
            getUserList(socket);
        })
        .on('getLotteries', () => {
            getEventList(socket);
        })
        .on('disconnect', function() {
            console.log('Got disconnect!');
            socket.emit('logout', {message: "Disconnected"});
            var i = allClients.indexOf(socket);
            allClients.splice(i, 1);
         })

    });
}
module.exports = mainSocket;