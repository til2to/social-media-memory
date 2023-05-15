import React, { useEffect } from 'react';
import { Container, } from '@material-ui/core'
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import CryptoJS from 'crypto-js';

// import './index.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Authen from './components/Auth/Authen';
import PostDetails from './components/postDetails/PostDetails';

const App = () => {
  const encryptedPayload = localStorage.getItem('profile');
  let user = null;

   // decrypt user profile from local storage
  const userInfo = process.env.REACT_APP_ENCODE_DECODE_OAUTH

  if (encryptedPayload) {
    const bytes = CryptoJS.AES.decrypt(encryptedPayload, userInfo);
    if (bytes.toString().length > 0) {
      const decryptedPayload = bytes.toString(CryptoJS.enc.Utf8);
      user = JSON.parse(decryptedPayload);
    } else {
      console.error('Failed to decrypt payload');
    }
  }
  // Navigate replace to="/posts"
  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/posts" /> } />
          <Route exact path="/posts" element={ <Home /> } />
          <Route exact path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={ <PostDetails /> } />
          <Route exact path="/auth" element={ !user ? <Authen /> : <Home /> } />
          <Route path='*' element={ <Navigate replace to="/auth" /> } />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App; 
