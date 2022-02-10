import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Congrates from "./Component/Congrates/Congrates";
import Home from './Component/Home/Home';
import useFirebase from "./Component/Hooks/useFirebase";
import Login from "./Component/Login/Login";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import Register from './Component/Register/Register';

function App() {
  return (
    <div className="App">


      <useFirebase>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/congratulation" element={<PrivateRoute> <Congrates /> </PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </useFirebase>



    </div>
  );
}

export default App;
