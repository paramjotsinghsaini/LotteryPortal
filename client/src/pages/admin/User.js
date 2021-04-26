import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Users from '../../components/admin/Users';
import Copyright from "../../components/Copyright";
import AdminHeader from '../../components/admin/AdminHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function User() {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AdminHeader/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Users />
          <Copyright />
        </Container>
      </main>
    </div>
  );
}