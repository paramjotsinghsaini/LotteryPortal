import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { format } from "date-fns";
import Paper from '@material-ui/core/Paper';
import { socket } from "../../../services/socket";


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

export default function UserList() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    useEffect(() => {
        socket.emit("getUsers");
        socket.on("UserList", data => {
            var users = data.users.slice(0,5);
            setRows(users);
        });
        setInterval(() => {
            socket.emit("getUsers");
        }, 1000)
    },[]);

    return (
        <Paper className={classes.paper}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                New Users
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{ format(Date.parse(row.createdAt), "d-M-y") }</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{(row.active===1) ? "Active" : "Inactive"}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

