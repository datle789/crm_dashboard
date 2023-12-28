import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout'
import Home from './Pages/homePage/Home';
import About from './Pages/About'
import Detail from './Pages/detailPage/Detail';
import CreateResponse from './Pages/createResponse/Create';

function App() {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/crm-user/:id' element={<Detail />} />
      <Route path='/create' element={<CreateResponse />} />
    </Routes>
  );
}

export default App;
