import React from 'react';
import '../src/styles/main.css'
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/AdminPage';
import ManutencaoInventario from './pages/ManutencaoInventario';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/index' element={<AdminPage></AdminPage>}>
          <Route path='manutencaoInventario' element={<ManutencaoInventario items={[{id:1, nome:'Lápis', quantidade: 5}]}></ManutencaoInventario>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
