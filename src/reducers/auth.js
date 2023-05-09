import * as actions from '../constants/actionTypes';
import CryptoJS from 'crypto-js';

const initialState = {
  isLoggedIn: false,
  username: ''
}
// Define a secret key for encryption
const secretKey = "my secret key with spaces and hashes#";

const authReducer = (state = { authData: null }, action) => {
  switch(action.type){
    case actions.AUTH:
      // Convert the payload to a string
      const payloadString = JSON.stringify({ ...action?.payload });
      // Encrypt the payload using AES encryption with the secret key
      const encryptedPayload = CryptoJS.AES.encrypt(payloadString, secretKey).toString();
      // Save the encrypted payload to localStorage
      localStorage.setItem('profile', encryptedPayload);
      // Update the state with the original payload
      return { ...state, authData: action?.payload };
      
    case actions.LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null }
    default:
      return state
  }
}

export default authReducer