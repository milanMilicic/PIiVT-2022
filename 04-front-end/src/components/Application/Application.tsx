import React from 'react';
import { Container } from 'react-bootstrap';
import {Routes, Route } from 'react-router-dom';
import Menu from '../Menu/Menu';
import UserAddCategory from '../User/Dashboard/UserAddCategory';
import UserCategoryList from '../User/Dashboard/UserCategoryList';
import UserDashboard from '../User/Dashboard/UserDashboard';
import LoginPage from '../User/LoginPage/LoginPage';
import './Application.sass';

function Application() {
  return (
    <Container className='mt-4'>

      <Menu />
        <Routes>

          <Route path='/auth/user/login' element={ <LoginPage /> } />
          <Route path='/' element={ <div></div>} />
          
          <Route path='/user/dashboard' element={<UserDashboard />} />
          <Route path='/user/dashboard/category/list' element={<UserCategoryList />} />
          <Route path='/user/dashboard/add-new-button' element={<UserAddCategory />} />

        </Routes>
      
    </Container>
  );
}

export default Application;
