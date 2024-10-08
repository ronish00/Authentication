import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route index path='/' element={<Register />} />
          <Route index path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          
          <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
