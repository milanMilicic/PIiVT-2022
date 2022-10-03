import React from 'react';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import {Routes, Route } from 'react-router-dom';
import AuthStore from '../../stores/AuthStore';
import Menu from '../Menu/Menu';
import UserAdd from '../User/Dashboard/UserAdd';
import UserAddCategory from '../User/Dashboard/UserAddCategory';
import UserAddEmployee from '../User/Dashboard/UserAddEmployee';
import UserAddSalary from '../User/Dashboard/UserAddSalary';
import UserCalculationList from '../User/Dashboard/UserCalculationList';
import UserCategoryEmployeesList from '../User/Dashboard/UserCategoryEmployeesList';
import UserCategoryList from '../User/Dashboard/UserCategoryList';
import UserDashboard from '../User/Dashboard/UserDashboard';
import UserEdit from '../User/Dashboard/UserEdit';
import UserEditEmployee from '../User/Dashboard/UserEditEmployee';
import UserEmployeeList from '../User/Dashboard/UserEmployeeList';
import UserEmployeeSalaryList from '../User/Dashboard/UserEmployeeSalaryList';
import UserList from '../User/Dashboard/UserList';
import UserSalaryEmployee from '../User/Dashboard/UserSalaryEmployee';
import LoginPage from '../User/LoginPage/LoginPage';
import './Application.sass';

function Application() {
  return (
    <Provider store={ AuthStore }>
      <Container className='mt-4'>
        <Menu />
          <Routes>

            <Route path='/auth/user/login' element={ <LoginPage /> } />
            <Route path='/' element={ <div><h1>Welcome</h1></div>} />
            <Route path='/user/dashboard' element={<UserDashboard />} />
            <Route path='/user/dashboard/category/list' element={<UserCategoryList />} />
            <Route path='/user/dashboard/add-new-button' element={<UserAddCategory />} />
            <Route path='/user/dashboard/add-new-employee-button' element={<UserAddEmployee />} />
            <Route path='/user/dashboard/category/:cid/employees' element={<UserCategoryEmployeesList />} />
            <Route path='/user/dashboard/category/:cid/employee/:eid' element={<UserEditEmployee />} />
            <Route path='/user/dashboard/employee/:eid/salary' element={<UserSalaryEmployee />} />

            <Route path='/user/dashboard/employee/list' element={<UserEmployeeList />} />
            <Route path='/user/dashboard/salary/list' element={<UserEmployeeSalaryList />} />
            <Route path='/user/dashboard/salary/add' element={<UserAddSalary />} />


            <Route path='/user/dashboard/user/list' element={<UserList />} />
            <Route path='/user/dashboard/user/add' element={<UserAdd />} />
            <Route path='/api/user/:uid' element={<UserEdit />} />

            <Route path='/user/dashboard/calculation/list' element={<UserCalculationList />} />



          </Routes> 
      </Container>
    </Provider>
  );
}

export default Application;
