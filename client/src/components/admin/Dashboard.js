import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventList from './fragment/EventList';
import UserList from './fragment/UserList';



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

export default function Dashboard() {
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <EventList/>
            </Grid>
            <Grid item xs={6}>
                <UserList/>
            </Grid>
        </Grid>
    );
}

