import React from 'react';
import '../src/styles/main.css'
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
