import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import AuthRequired from "./Components/AuthRequired";
import AddTweet from "./Pages/AddTweet/AddTweet";
import { Home } from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import PostDetail from "./Pages/PostDetail/PostDetail";
import Profile from "./Pages/Profile/Profile";
import { Registration } from "./Pages/Registration/Registration";

function AppRoutes() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const loginSuccess = (token) => {
    setToken(token);
    navigate("/home");
  };

  return (
    <Routes>
      <Route path="/" element={<Login loginSuccess={loginSuccess} />} />
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
      <Route
        path="/user/:userId"
        element={
          <AuthRequired token={token} setToken={setToken}>
            <Profile token={token} />
          </AuthRequired>
        }
      />
      <Route
        path="/addPost"
        element={
          <AuthRequired token={token} setToken={setToken}>
            <AddTweet token={token} />
          </AuthRequired>
        }
      />
      <Route
        path="/post/:postId"
        element={
          <AuthRequired token={token} setToken={setToken}>
            <PostDetail token={token} />
          </AuthRequired>
        }
      ></Route>
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
