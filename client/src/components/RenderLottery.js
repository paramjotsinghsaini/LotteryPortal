import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import RenderButton from './RenderButton';

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
  prize: {    
    width: '100%',
    justifyContent: 'center'
  },
  prizeSpan: {
    fontSize: '1.5rem',
    fontWeight: '800'
  }
}));


export default function RenderLottery(props){
    const classes = useStyles();
    const prize = props.entry * props.max;
    const [sold, setSold] = useState(0);
    useEffect(()=>{
      setSold(props.current);
    }, [props]);
    return (
        <Grid item key={props.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={props.img}
              title={props.name}
            />
            <CardContent className={classes.cardContent}>
              <Grid container className={classes.prize}>
                <Typography gutterBottom variant="inherit" component="span"  className={classes.prizeSpan}>
                {props.name}
                </Typography>
              </Grid>
            </CardContent>
            <CardContent className={classes.cardContent}>
              <Grid container>
                <Grid item xs>
                  <Typography gutterBottom variant="inherit" component="span">
                    Entry: {props.entry}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="inherit" component="span">
                    {sold} of {props.max} sold
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent className={classes.cardContent}>
              <Grid container className={classes.prize}>
                <Typography gutterBottom variant="inherit" component="span"  className={classes.prizeSpan}>
                  Prize Amount : {prize}
                </Typography>
              </Grid>
            </CardContent>
            <CardContent className={classes.cardContent}>
              <RenderButton 
                id = {props.id}
                user = {props.user}
                max = {props.max}
                entry = {props.entry}
              />
            </CardContent>
          </Card>
        </Grid>
    );
}