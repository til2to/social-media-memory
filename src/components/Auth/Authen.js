import React, {useEffect, useState} from 'react';
import { Typography, Button, Paper, Grid, Container, Avatar } from '@material-ui/core';
import LockedOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script'
import { useDispatch } from 'react-redux';

import useStyles from './styles'
import CustomInput from './CustomizedInput';
import Icon from './icon'
import * as actions from '../../constants/actionTypes';
import * as authens from "../../actions/auth";

const initialState = {
  firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
}

const Authen = () => { 
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignin, setIsSignin] = useState()
  const [formData, setFormData] = useState(initialState)
  
  // to use the new google Oauth2
  useEffect(() => {
    gapi.load("client:auth2", ()=>{
      gapi.auth2.init({clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID})
    })
  }, []);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!isSignin){
      dispatch(authens.signup(formData, navigate))
    }else{
      dispatch(authens.signin(formData, navigate))
    }
  }

  // toggle password field, hide and show
  const handleShowPassword = () => {
    return setShowPassword((prevShowPassword) => !prevShowPassword)
  }
  // switch toggle sign up and sign in
  const switchMode = () => {
    setIsSignin((prevSignin) => !prevSignin);
    setShowPassword(false);
  }
  // handle google Oauth responses
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: actions.AUTH, payload: { result, token }})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };
  const googleFailure = (error) => {
    console.log(error)
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockedOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{!isSignin ? "Sign up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              !isSignin && (
                <>
                  <CustomInput name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                  <CustomInput name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
            )}
            <CustomInput name="email" label="Email Address" handleChange={handleChange} type="email" />  
            <CustomInput name="password" label="Password" 
              handleChange={handleChange} 
              type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}
            />
            {!isSignin && 
              <CustomInput name="confirmPassword" label="Repeat Password" 
                handleChange={handleChange} type={showPassword ? "text" : "password"} 
                handleShowPassword={handleShowPassword}
              />
            }
          </Grid>
          <Button type='submit' fullWidth variant="contained" color='primary' className={classes.submit}>
            {!isSignin ? 'Sign Up' : "Sign In"}
          </Button>
          <GoogleLogin 
            clientId={clientId}
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
            useOneTap
          />
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {!isSignin ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Authen