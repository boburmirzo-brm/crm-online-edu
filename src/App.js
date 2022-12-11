// @ts-nocheck
import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from "./router/home/Home"
import Login from "./router/login/Login"
import CheckRoute from './router/check-route/CheckRoute';
import RegisterStudent from './router/register-student/RegisterStudent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/check/*' element={<CheckRoute/>}/>
        <Route path='/register-student' element={<RegisterStudent/>}/>
      </Routes>
    </div>
  );
}

export default App;
