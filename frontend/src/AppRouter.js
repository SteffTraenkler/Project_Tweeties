import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import AuthRequired from "./Components/AuthRequired";

import { useProfileInfo } from "./hooks/useProfileInfo"

import AddTweet from "./Pages/AddTweet/AddTweet";
import { Home } from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import PostDetail from "./Pages/PostDetail/PostDetail";
import Profile from "./Pages/Profile/Profile";
import ProtectedContent from "./Pages/ProtectedContent";
import { Registration } from "./Pages/Registration/Registration";
import SearchUsers from "./Pages/SearchUser/SearchUsers";
import ShowUserLiked from "./Pages/showUsers(Like,RT,Follower,Following)/ShowUserLiked";
import ShowUserRTd from "./Pages/showUsers(Like,RT,Follower,Following)/ShowUserRTd";
import ShowUsersFollowed from "./Pages/showUsers(Like,RT,Follower,Following)/ShowUsersFollowed";
import ShowUsersWhoFollow from "./Pages/showUsers(Like,RT,Follower,Following)/ShowUsersWhoFollow";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import EditProfile from "./Pages/Profile/ProfileEdit";

function AppRoutes() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const loginSuccess = (token) => {
    setToken(token);
    navigate("/secure/home");
  };


  const profileInfo = useProfileInfo(token)


  return (
    <Routes>
      <Route path="/" element={<Login loginSuccess={loginSuccess} />} />
      <Route path="/signup" element={<Registration />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      <Route path="/secure/home"
        element={
          <AuthRequired token={token} setToken={setToken}>
            <ProtectedContent token={token} profileInfo={profileInfo} />
          </AuthRequired>
        }
      >

        <Route index element={<Home token={token} profileInfo={profileInfo} />} />

        <Route path="post/:postId" element={<PostDetail token={token} profileInfo={profileInfo} />} />
        <Route path="post/likes/:postId" element={<ShowUserLiked token={token} profileInfo={profileInfo} />} />
        <Route path="post/retweets/:postId" element={<ShowUserRTd token={token} profileInfo={profileInfo} />} />

        <Route path="user/:userId" element={<Profile token={token} profileInfo={profileInfo} />} />

        <Route path="user/editProfile/:userId" element={<EditProfile token={token} profileInfo={profileInfo} />} />

        <Route path="users/following/:userId" element={<ShowUsersFollowed token={token} profileInfo={profileInfo} />} />
        <Route path="users/follower/:userId" element={<ShowUsersWhoFollow token={token} profileInfo={profileInfo} />} />
        <Route path="user/searchUsers" element={<SearchUsers token={token} profileInfo={profileInfo} />} />

      </Route>

      <Route
        path="/addPost"
        element={
          <AuthRequired token={token} setToken={setToken}>
            <AddTweet token={token} profileInfo={profileInfo} />
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
