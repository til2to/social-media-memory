import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core';
import CryptoJS from 'crypto-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from "./styles";
import memories from '../../images/memories.png';
import * as actions from '../../constants/actionTypes';

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const encryptedPayload = localStorage.getItem('profile');
  let payloadObject = null;
  
  if (encryptedPayload) {
    const bytes = CryptoJS.AES.decrypt(encryptedPayload, "your secret key");
  
    if (bytes.toString().length > 0) {
      const decryptedPayload = bytes.toString(CryptoJS.enc.Utf8);
      payloadObject = JSON.parse(decryptedPayload);
    } else {
      console.error('Failed to decrypt payload');
    }
  }
  
  const [user, setUser] = useState(payloadObject);

  const logout = () => {
    dispatch({ type: actions.LOGOUT })
    navigate('/')
    setUser(null)
  }

  useEffect(()=>{
    const token = user?.token;
    // const result = user?.result;
    if(token) {
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
    setUser(payloadObject)
  }, [location])

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} component={Link} to="/" variant='h2' align='center'> 
          Memories 
        </Typography>
        <img src={memories} alt='memories' height='60' />
      </div>
      <Toolbar className={classes.tootbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl}>
              {user?.result?.name?.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result?.name}
            </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
          ) : 
          (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
