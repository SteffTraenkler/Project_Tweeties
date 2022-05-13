const { registerUser } = require("./register-user");
const { loginUser } = require("./login-user");
const { refreshUserToken } = require("./refresh-user-token");
const { listAllUsers } = require("./list-all-users");
const { showProfileInfo } = require("./show-profile");

const { addPost } = require("./add-post");
const { likePost } = require("./like-post");
const { showPost } = require("./show-post");
const { listMainFeed } = require("./list-main-feed");

const UserService = {
  registerUser,
  loginUser,
  refreshUserToken,
  listAllUsers,
  showProfileInfo,
};

const PostService = {
  addPost,
  likePost,
  showPost,
  listMainFeed,
};

module.exports = {
  UserService,
  PostService,
};
