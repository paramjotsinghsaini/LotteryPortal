import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { getUser } from '../functions/authUser';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getHomeContent } from '../functions/home';
import Lottery from '../components/Lottery';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const createCard = (card) => {
  const count = card.tickets.length;
  return (
            <Lottery
              name = {card.name} 
              key = {card.id}
              id = {card.id}
              max={card.maxParticipants}
              current = {count}
              img= {card.img}
              entry = {card.entryFee}
            />
          );
}

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [lottery, setLottery] = useState([]);
  useEffect(() => {
    const user = getUser();
    if(user){
        return history.push('/dashboard');
    };
    getHomeContent().then((response)=>{
      console.log(response.data);
      setLottery(response.data.lottery);
    }).catch((err)=>{
      console.log(err.message);
    })
  }, [history]);
  return (
      <Container>
        <Header/>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {lottery.map(createCard)}
          </Grid>
        </Container>
        <Footer/>
      </Container>
  );
}