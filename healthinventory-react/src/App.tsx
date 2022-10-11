import React from 'react';
import '../src/styles/main.css'
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/index' element={<Menu></Menu>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
