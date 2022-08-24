import React from 'react';
import { Container } from 'react-bootstrap';
import {Routes, Route } from 'react-router-dom';
import Menu from '../Menu/Menu';
import LoginPage from '../User/LoginPage/LoginPage';
import './Application.sass';

function Application() {
  return (
    <Container className='mt-4'>

      <Menu />
        <Routes>

          <Route path='/auth/user/login' element={ <LoginPage /> } />
          <Route path='/' element={ <div></div>} />

        </Routes>
      
    </Container>
  );
}

export default Application;
