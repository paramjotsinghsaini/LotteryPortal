import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { makeStyles } from '@material-ui/core/styles';
import { credits, getUser } from '../functions/authUser';
import { socket } from "../services/socket";


const useStyles = makeStyles((theme) => ({
    toolbarTitle: {
      flexGrow: 1,
    }
}));

export default function Credit() {
    const classes = useStyles();
    const [credit,setCredit] = useState(0);
    useEffect(() => {
        const user = getUser();
        credits().then((credits)=>{
            setCredit(credits.data.amount);
        });
        setInterval( () => {
            socket.emit('user', {userId: user.id});
        }, 1000)
        socket.on('Credits', data => {
            if(data)
            {
                setCredit(data.amount);
            }
        });
    },[]);

    return (
        <Typography key={1} variant="button" color="textPrimary" className={classes.toolbarTitle}>
            Balance: <AttachMoneyIcon fontSize="inherit" />{credit}
        </Typography>
    );
}

