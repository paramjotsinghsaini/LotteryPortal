import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import { socket } from "../../services/socket";
import { deleteUser } from '../../functions/admin';


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

export default function Users() {

    const deleteItem = (userId, index) => {
        deleteUser(userId).then(response => {
            if(response.data)
            {
                setRows(rows.slice(index,1));
            }
        })
        .catch(err => console.log(err.message));
    }

    const classes = useStyles();
    const [rows, setRows] = useState([]);
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
                <Button component={Link} to={"/admin/user/add"} color="primary">
                    {"Create New"}
                </Button>
            </div>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>User Name</TableCell>
                        <TableCell className={classes.headerCenter}>Status</TableCell>
                        <TableCell className={classes.headerCenter}>Credits</TableCell>
                        <TableCell className={classes.headerCenter}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.username}</TableCell>
                            <TableCell className={classes.headerCenter}>{(row.active===1) ? "Active" : "Inactive"}</TableCell>
                            <TableCell className={classes.headerCenter}><AttachMoneyIcon  fontSize="inherit"/>{ row.credit.amount }</TableCell>
                            <TableCell className={classes.headerCenter}>
                                <Button component={Link} to={"/admin/credit/"} color="primary">
                                    Add Credits
                                </Button>
                                <Button component={Link} to={"/admin/user/" + row.id} color="primary">
                                    <EditIcon/>
                                </Button>
                                <Button onClick={(e) => deleteItem(row.id, index) } color="secondary">
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

