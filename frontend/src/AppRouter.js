import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

function AppRoutes() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const loginSuccess = (token) => {
    setToken(token);
    navigate("/home");
  };

  loginSuccess(); //Needs to be deleted

  return (
    <Routes>
      <Route path="/"></Route>
      <Route path="/signup"></Route>
      <Route path="/verify-email"></Route>
      <Route path="/home" token={token}></Route> /Paused needs to be written
      correct/
    </Routes>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
