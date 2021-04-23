import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getUser, login } from '../../functions/authUser'
import { Link as LinkCom, useHistory } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RenderError = (props) => {
    return (
        <Typography component="h1" variant="h5">
          {props.error}
        </Typography>
    );
}

export default function Signin() {
    const history = useHistory();
    const classes = useStyles();
    const [username, setUsername]   = useState("")
    const [password, setPassword]   = useState("")
    const [remember, setRemember]   = useState(false)
    const [error, setError]         = useState("")

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password, remember).then(response => {
            history.push("/dashboard");
            window.location.reload();   
        })
        .catch(err => {
            console.log(err);
            setError(err.message);
        })
    }
    useEffect(() => {
        const user = getUser();
        if(user){
            return history.push('/dashboard');
        };
    }, [history]);

  return (
    <Container>
      <Header/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <RenderError message={error} />
          <form className={classes.form} noValidate onSubmit={(e) => handleLogin(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange={(e) => setRemember(e.target.value)} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
              <Link component={LinkCom} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Footer/> 
    </Container>
  );
}