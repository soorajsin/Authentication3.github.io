import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./componets/Register";
import Login from "./componets/Login";
import Dashboard from "./componets/Dashboard";
import Error from "./componets/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
