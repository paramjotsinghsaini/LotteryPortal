import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import { socket } from "../../services/socket";
import { deleteLottery } from '../../functions/admin';


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
    headerCenter: {
        textAlign: "center",
    },
    custom: {
        display: "flex",
        justifyContent: "space-between"
    }
}));

export default function Lottery() {

    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const deleteEvent = (lotteryId, index) => {
        deleteLottery(lotteryId).then(response => {
            if(response.data)
            {
                setRows(rows.slice(index, 1));
            }
        })
        .catch(err => console.log(err.message));
    }

    useEffect(() => {
        socket.emit("getLotteries");
        socket.on("LotteryList", data => {
            setRows(data.lotteries);
        });
        // setInterval(() => {
        //     socket.emit("getLotteries");
        // }, 1000)
    },[]);

    return (
        <Paper className={classes.paper}>
            <div className={classes.custom}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Lottery List
                </Typography>
                <Button component={Link} to={"/admin/lottery/add"} color="primary">
                    {"Create New"}
                </Button>
            </div>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Entry Fee</TableCell>
                        <TableCell className={classes.headerCenter}>Max Participants</TableCell>
                        <TableCell className={classes.headerCenter}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell><Avatar alt={row.name} src={row.image} /></TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.entryFee}</TableCell>
                            <TableCell className={classes.headerCenter}>{row.maxParticipants}</TableCell>
                            <TableCell className={classes.headerCenter}>
                                <Button component={Link} to={"/admin/lottery/" + row.id} color="primary">
                                    <EditIcon/>
                                </Button>
                                <Button onClick={(e) => deleteEvent(row.id, index) } color="secondary">
                                    <DeleteIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

