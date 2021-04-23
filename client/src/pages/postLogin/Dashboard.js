import React, { useEffect, useState } from "react";
import { getDashboardContent } from "../../functions/dashboard"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RenderLottery from "../../components/RenderLottery";
import Footer from "../../components/Footer";
import AuthHeader from "../../components/AuthHeader";


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
                <RenderLottery
                    name = {card.name} 
                    key = {card.id}
                    id = {card.id}
                    max={card.maxParticipants}
                    current = {count}
                    img= {card.img}
                    entry = {card.entryFee}
                    tickets = {card.tickets}
                />
            );
  }

const Dashboard = () => {
    const classes = useStyles();
    const [lottery, setLottery] = useState([]);

    useEffect(() => {
        getDashboardContent().then((response) => {
          if(response && response.data)
          {
            setLottery(response.data.lottery);
          }
        }).catch((err) => {
            console.log("dashboard");
        })
    },[])
  return (
    <Container>
    <AuthHeader/>
      <Container className={classes.cardGrid} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {/* {lottery.map((data) => ( */}
          {lottery.map(createCard)}
        {/* )
        )} */}
      </Grid>
    </Container>
    <Footer/>
  </Container>

  );
};

export default Dashboard;