import React from 'react';
import { Container } from 'react-bootstrap';
import LoginPage from '../User/LoginPage/LoginPage';
import './Application.sass';

function Application() {
  return (
    <Container className='mt-4'>
      <LoginPage />
    </Container>
  );
}

export default Application;
