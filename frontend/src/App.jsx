import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/register'
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element="" >
          <Route index path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
