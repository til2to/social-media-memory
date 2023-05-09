import React from 'react';
import { Container, } from '@material-ui/core'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Authen from './components/Auth/Authen';

const App = () => (
  
  <BrowserRouter>
    <Container maxidth='lg'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authen />} />
      </Routes>
    </Container>
  </BrowserRouter>
  
)

export default App; 
