import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import AuthRequired from "./Components/AuthRequired";
import { Home } from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Registration } from "./Pages/Registration/Registration";

function AppRoutes() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // const loginSuccess = (token) => {
  //   setToken(token);
  //   navigate("/home");
  // };

  // loginSuccess(); //Needs to be deleted

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Registration />} />
      {/* <Route path="/verify-email" /> */}
      <Route
        path="/home"
        element={
          <AuthRequired token={token} setToken={setToken}>
            <Home token={token} />
          </AuthRequired>
        }
      />
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
