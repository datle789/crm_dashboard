import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout'
import Home from './Pages/homePage/Home';
import About from './Pages/About'
import Detail from './Pages/detailPage/Detail';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/crm-user/:id' element={<Detail />} />
    </Routes>
  );
}

export default App;
