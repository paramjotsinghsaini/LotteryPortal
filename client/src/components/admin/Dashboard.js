import React from 'react';
import Grid from '@material-ui/core/Grid';
import EventList from './fragment/EventList';
import UserList from './fragment/UserList';

export default function Dashboard() {

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

