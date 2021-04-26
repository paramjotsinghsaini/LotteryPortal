import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Copyright from '../../components/Copyright';
import AdminHeader from '../../components/admin/AdminHeader';
import { Link as LinkCom, useHistory, useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { getUserUsingId, saveUser } from '../../functions/admin';

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserForm() {
  const history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const [header, setHeader]         = useState("");
  const [name, setName]   = useState("");
  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");
  const [id, setId]     = useState("");
  const submitUser = (e) => {
      e.preventDefault();

      saveUser(id, name, username, password).then(response => {
          alert(response.data.message);
      })
      .catch(err => {
          console.log(err);
      });
  };
  useEffect(()=>{
    if(params.userId)
    {
      setHeader("Update User");
      getUserUsingId(params.userId).then(response => {
        setName(response.data.name);
        setUsername(response.data.username);
      }).catch(err => console.log(err.message));
    }
    else{
      setHeader("Add User");
    }
  },[params])
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AdminHeader/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="sm" className={classes.container}>
          <h3>{header}</h3>
          <form className={classes.form} noValidate onSubmit={(e) => submitUser(e)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    value={name}
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    autoComplete="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                { (!params.userId) ? (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                 ) : "" }
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {header}
              </Button>
            </form>
              <Copyright />
        </Container>
      </main>
    </div>
  );
}