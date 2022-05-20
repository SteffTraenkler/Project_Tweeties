import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import AuthRequired from "./Components/AuthRequired";
import AddTweet from "./Pages/AddTweet/AddTweet";
import { Home } from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import PostDetail from "./Pages/PostDetail/PostDetail";
import Profile from "./Pages/Profile/Profile";
import ProtectedContent from "./Pages/ProtectedContent";
import { Registration } from "./Pages/Registration/Registration";
import ShowUserLiked from "./Pages/showUsers(Like,RT,Follower,Following)/ShowUserLiked";
import ShowUserRTd from "./Pages/showUsers(Like,RT,Follower,Following)/ShowUserRTd";
import ShowUsersFollowed from "./Pages/showUsers(Like,RT,Follower,Following)/ShowUsersFollowed";
import ShowUsersWhoFollow from "./Pages/showUsers(Like,RT,Follower,Following)/ShowUsersWhoFollow";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";

function AppRoutes() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const loginSuccess = (token) => {
    setToken(token);
    navigate("/secure/home");
  };


  return (
    <Routes>
      <Route path="/" element={<Login loginSuccess={loginSuccess} />} />
      <Route path="/signup" element={<Registration />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      <Route path="/secure/home"
        element={
          <AuthRequired token={token} setToken={setToken}>
            <ProtectedContent token={token} />
          </AuthRequired>
        }
      >

        <Route index element={<Home token={token} />} />
        <Route path="user/:userId" element={<Profile token={token} />} />
        <Route path="post/:postId" element={<PostDetail token={token} />} />
        <Route path="post/likes/:postId" element={<ShowUserLiked token={token} />} />
        <Route path="post/retweets/:postId" element={<ShowUserRTd token={token} />} />
        <Route path="users/following/:userId" element={<ShowUsersFollowed token={token} />} />
        <Route path="users/follower/:userId" element={<ShowUsersWhoFollow token={token} />} />

      </Route>
      {/* /> */}
      {/* <Route
        path="/home"
        element={
          <AuthRequired token={token} setToken={setToken}>
            <Home token={token} />
          </AuthRequired>
        }
      /> */}
      {/* <Route
        path="/user/:userId"
        element={
          <AuthRequired token={token} setToken={setToken}>
            <Profile token={token} />
          </AuthRequired>
        }
      /> */}
      <Route
        path="/addPost"
        element={
          <AuthRequired token={token} setToken={setToken}>
            <AddTweet token={token} />
          </AuthRequired>
        }
      />
      {/* <Route
        path="/post/:postId"
        element={
          <AuthRequired token={token} setToken={setToken}>
            <PostDetail token={token} />
          </AuthRequired>
        }
      ></Route> */}
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
