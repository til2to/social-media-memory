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
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<Authen />} />
        <Route path='*' element={<div>Page Not Found!</div>} />
      </Routes>
    </Container>
  </BrowserRouter>
  
)

export default App; 
