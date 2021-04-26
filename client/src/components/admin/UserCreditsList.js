import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { socket } from "../../services/socket";
import { updateUserCredits } from '../../functions/admin';
import TextField from '@material-ui/core/TextField';


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

export default function UserCreditsList() {

    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [updatedCredits, setUpdatedCredits] = useState(0);

    const updateCredits = (userId, amount) => {
        updateUserCredits(userId, amount)
        .then(response => {
            alert(response.data.message);
        })
        .catch(err => {
            console.log(err);
        });
    }
    useEffect(() => {
        socket.emit("getUsers");
        socket.on("UserList", data => {
            setRows(data.users);
        });
        setInterval(() => {
            socket.emit("getUsers");
        }, 1000)
    },[]);

    return (
        <Paper className={classes.paper}>
            <div className={classes.custom}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    User List
                </Typography>
            </div>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell className={classes.headerCenter}>Credits</TableCell>
                        <TableCell className={classes.headerCenter}>Add</TableCell>
                        <TableCell className={classes.headerCenter}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell className={classes.headerCenter}><AttachMoneyIcon  fontSize="inherit"/>{ row.credit.amount }</TableCell>
                            <TableCell className={classes.headerCenter}>
                            <TextField
                                autoComplete="credit"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id={"credit_"+row.id}
                                label="Credit"
                                autoFocus
                                onChange={(e)=>setUpdatedCredits(e.target.value)}
                            />
                            </TableCell>
                            <TableCell className={classes.headerCenter}>
                                <Button color="primary" onClick={(e) => updateCredits(row.id, updatedCredits)}>
                                    Add Credits
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

