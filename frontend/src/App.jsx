import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { dataContext } from "./context/UserContext";

const App = () => {
  const { userData, setUserData } = useContext(dataContext);

  return (
    <Routes>
      <Route path="/" element={userData ? <Home /> : <Login/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
