import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Copyright from '../../components/Copyright';
import AdminHeader from '../../components/admin/AdminHeader';
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { getLotteryUsingId, saveLottery } from '../../functions/admin';

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

export default function LotteryForm() {
  const params          = useParams();
  const classes         = useStyles();
  const [header, setHeader]         = useState("");
  const [name, setName]             = useState("");
  const [entryFee, setEntryFee]     = useState("");
  const [maxParticipants, setMaxParticipants]     = useState("");
  const [id, setId]               = useState("");
  const submitLottery = (e) => {
      e.preventDefault();

      saveLottery(id, name, entryFee, maxParticipants).then(response => {
          if(response){
            alert(response.data.message);
          }
      })
      .catch(err => {
          console.log(err);
      });
  };
  useEffect(()=>{
    if(params.eventId)
    {
      setHeader("Update Lottery");
      getLotteryUsingId(params.eventId)
      .then(response => {
        setId(response.data.id);
        setName(response.data.name);
        setEntryFee(response.data.entryFee);
        setMaxParticipants(response.data.maxParticipants);
      }).catch(err => console.log(err.message));
    }
    else{
      setHeader("Add Lottery");
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
          <form className={classes.form} noValidate onSubmit={(e) => submitLottery(e)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    value={name}
                    autoComplete="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="entryFee"
                    label="Entry Fee"
                    name="entryFee"
                    value={entryFee}
                    autoComplete="entryFee"
                    onChange={(e) => setEntryFee(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="maxParticipants"
                    label="Max Participants"
                    type="number"
                    value={maxParticipants}
                    id="maxParticipants"
                    min="0"
                    autoComplete="maxParticipants"
                    onChange={(e) => setMaxParticipants(e.target.value)}
                  />
                </Grid>
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