import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout'
import Home from './Pages/homePage/Home';
import About from './Pages/About'
import Detail from './Pages/detailPage/Detail';
import CreateResponse from './Pages/createResponse/Create';
import { RedirectToLogin } from './Pages/RedirectToLogin';
import { Login } from './Pages';
import DeleteResponse from './Pages/deleteResponse/DeleteResponse';

function App() {
  return (
    <Routes>
      <Route index element={<RedirectToLogin />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/crm-user/:id' element={<Detail />} />
      <Route path='/delete/:id' element={<DeleteResponse />} />
      <Route path='/create' element={<CreateResponse />} />
    </Routes>
  );
}

export default App;
