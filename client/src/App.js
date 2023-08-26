import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './componets/Register';
import Login from './componets/Login';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
