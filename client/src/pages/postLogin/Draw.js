import React, { useEffect, useState } from "react";
import { useParams , useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import AuthHeader from "../../components/AuthHeader";
import Footer from "../../components/Footer";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Timer from '../../components/Timer';
import { getLotteryDetail } from "../../functions/dashboard";

import { socket } from "../../services/socket";

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
      display: 'flex',
      justifyContent: 'center'
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '30%'
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    prize: {    
      width: '100%',
      justifyContent: 'center'
    },
    btnCenter: {
      width: '100%',
      justifyContent: 'center',
      display: 'flex'
    },
    prizeSpan: {
      fontSize: '1.5rem',
      fontWeight: '800'
    },
    timer: {
      display: "flex",
      justifyContent: "space-around",
      fontSize: "large",
      fontWeight: "800"
    },
    centerAlign: {
      justifyContent: "center",
    }
  }));

const Draw = () => {
    const classes = useStyles();
    const [startTimer, setStartTimer] = useState(false);
    const [currentParticipants, setCurrentParticipants] = useState(0);
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [price, setPrice] = useState(0);
    const [maxParticipants, setMaxParticipants] = useState(0);
    const [prizeAmount, setPrizeAmount] = useState(0);
    const history = useHistory();
    const params = useParams();
    
    useEffect(()=>{
      getLotteryDetail(params.eventId).then((response) => {
        const data = response.data;
        setId(data.id);
        setName(data.name);
        setPrice(data.entryFee);
        setMaxParticipants(data.maxParticipants);
        setPrizeAmount(data.entryFee * data.maxParticipants);
        setImg(data.img);
      }).catch((err)=>{
        console.log(err.message)
      });
      socket.on('currentParticipants', data => {
        if(data && data.count)
        {
          setCurrentParticipants(data.count);
        }
      })
      socket.on('startTimer', data => {
          setStartTimer(true);
      })
  },[params, id]);
  return (
    <Container>
      <AuthHeader/>
      <Container className={classes.cardGrid} >
          {/* End hero unit */}
          <Grid container spacing={6} className={classes.centerAlign}>
              <Grid item key={1} xs={12} sm={12} md={6}>
              <CardMedia
                className={classes.cardMedia}
                image={img}
                title="Image title"
              />
              <Card className={classes.card}>
                <CardContent>
                  <Grid container className={classes.prize}>
                    <Typography gutterBottom variant="inherit" component="span"  className={classes.prizeSpan}>
                      {name}
                    </Typography>
                  </Grid>
                </CardContent>
                <CardContent>
                  <Grid container>
                    <Grid item xs>
                      <Typography gutterBottom variant="inherit" component="span">
                        Ticket Prize: {price}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="inherit" component="span">
                        Current Participants: {currentParticipants} of {maxParticipants}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardContent>
                  <Grid container className={classes.prize}>
                    <Typography gutterBottom variant="inherit" component="span"  className={classes.prizeSpan}>
                      Prize Amount : {prizeAmount}
                    </Typography>
                  </Grid>
                </CardContent>
                <CardContent className={classes.timer}>
                  <Timer timer= {10} start = {startTimer}></Timer>
                </CardContent>
                <CardContent className={classes.btnCenter}>
                  <Button
                    type="button"
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(e)=>{history.push('/dashboard')}}
                    >Back to dashboard</Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      <Footer/> 
    </Container>

  );
};

export default Draw;