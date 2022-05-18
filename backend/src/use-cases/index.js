const { registerUser } = require("./register-user");
const { loginUser } = require("./login-user");
const { refreshUserToken } = require("./refresh-user-token");
const { listAllUsers } = require("./list-all-users");
const { showProfileInfo } = require("./show-profile");
const { showUser } = require("./show-user");
const { showUsersLikedPosts } = require("./show-users-liked-posts")

const { addPost } = require("./add-post");
const { likePost } = require("./like-post");
const { showPost } = require("./show-post");
const { listMainFeed } = require("./list-main-feed");
const { retweetPost } = require("./retweetPost");

const UserService = {
  registerUser,
  loginUser,
  refreshUserToken,
  listAllUsers,
  showProfileInfo,
  showUser,
  showUsersLikedPosts
};

const PostService = {
  addPost,
  likePost,
  showPost,
  listMainFeed,
  retweetPost
};

module.exports = {
  UserService,
  PostService,
};
