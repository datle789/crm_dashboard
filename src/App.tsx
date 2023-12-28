import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout'
import { Login, About, Home } from './Pages'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
    </Routes>
  );
}

export default App;
