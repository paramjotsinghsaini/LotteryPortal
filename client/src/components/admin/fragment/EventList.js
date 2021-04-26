import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { socket } from "../../../services/socket";
import { format } from "date-fns";



const useStyles = makeStyles((theme) => ({
    toolbarTitle: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'hidden',
      flexDirection: 'column',
      minHeight: '272px'
    },
}));

export default function EventList() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    useEffect(() => {
        socket.emit("getLotteries");
        socket.on("LotteryList", data => {
            var lotteries = data.lotteries.slice(0,5);
            setRows(lotteries);
        });
        setInterval(() => {
            socket.emit("getLotteries");
        }, 1000)
    },[]);

    return (
        <Paper className={classes.paper}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Ongoing Events
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Participants</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{ format(Date.parse(row.createdAt), "d-M-y") }</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.tickets.length}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

