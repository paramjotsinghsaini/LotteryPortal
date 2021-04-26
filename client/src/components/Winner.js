import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import CardContent from '@material-ui/core/CardContent';
import { socket } from "../services/socket";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
}));

const Winner = (props) => {
    const classes = useStyles();
    const params = useParams();
    const [word, setWord] = useState("");
    const [name, setName] = useState("");
    const [winningTicket, setWinningTicket] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    useEffect(()=>{
        socket.emit('getWinner', {eventId: params.eventId});
        socket.on('winnerDeclared', data => {
            console.log(data);
            if(data && data.result)
            {
              const lottery         =   data.result.lottery;
              const winning         =   data.result.winningTicket;
              const winner          =   data.result.winner;
              const msg             =   data.result.message;
              if(winner){
                const firstWord = winner.name.charAt(0);
                setWord(firstWord);
                setName(winner.name);
              }
              if(winning){
                setWinningTicket(winning.number);
              }
              if(msg){
                setMessage(msg);
              }
              if(lottery)
              {
                const amt = lottery.entryFee * lottery.maxParticipants;
                setAmount(amt)
              }
            }
        });
    }, [params]);

    return (
        <Container className={classes.container} >
            <Avatar className={classes.orange}>{word}</Avatar>
            <Typography gutterBottom variant="inherit" component="span"  className={classes.prizeSpan}>
                Winner: {name}
            </Typography>
            <CardContent>
              <Typography gutterBottom variant="inherit" component="span"  className={classes.prizeSpan}>
                  Winning Ticket: {winningTicket}
              </Typography>
              <Typography gutterBottom variant="inherit" component="span"  className={classes.prizeSpan}>
                  Won: {amount}
              </Typography>
            </CardContent>
            <Typography gutterBottom variant="inherit" component="span"  className={classes.prizeSpan}>
                {message}
            </Typography>
            
        </Container>
    );
}
export default Winner;