import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useStyles from "./styles";
import memories from './images/memories.png';
import { getPosts } from './actions/posts';
import './App.css';
import Posts from './components/posts/Posts';
import Form from './components/form/Form';

const App = () => {
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPosts())
  }, [currentId, dispatch])
  
  return (
    <Container maxidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'> Memories </Typography>
        <img src={memories} alt='memories' height='60' />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App; 
