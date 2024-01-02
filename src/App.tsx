import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout'
import Home from './Pages/homePage/Home';
import About from './Pages/About'
import { RedirectToLogin } from './Pages/RedirectToLogin';
import { Login } from './Pages';

function App() {
  return (
    <Routes>
      <Route index element={<RedirectToLogin />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
    </Routes>
  );
}

export default App;
