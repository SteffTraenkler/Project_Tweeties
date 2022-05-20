const { registerUser } = require("./register-user");
const { loginUser } = require("./login-user");
const { refreshUserToken } = require("./refresh-user-token");
const { listAllUsers } = require("./list-all-users");
const { showProfileInfo } = require("./show-profile");
const { showUser } = require("./show-user");
const { showUsersLikedPosts } = require("./show-users-liked-posts")
const { verifyUserEmail } = require("./verify-user-email")
const { followUnfollowUser } = require("./follow-unfollow-User")
const { findUsersOfRtsAndLikes } = require("./find-users-of-rt-and-likes")
const { findFollowerAndFollowing } = require("./find-followers-and-following-users")
const { editProfile } = require("./edit-profile")

const { addPost } = require("./add-post");
const { likePost } = require("./like-post");
const { showPost } = require("./show-post");
const { listMainFeed } = require("./list-main-feed");
const { retweetPost } = require("./retweetPost");
const { deleteYourPost } = require("./delete-your-own-post")

const UserService = {
  registerUser,
  loginUser,
  refreshUserToken,
  listAllUsers,
  showProfileInfo,
  showUser,
  showUsersLikedPosts,
  verifyUserEmail,
  followUnfollowUser,
  findUsersOfRtsAndLikes,
  findFollowerAndFollowing,
  editProfile
};

const PostService = {
  addPost,
  likePost,
  showPost,
  listMainFeed,
  retweetPost,
  deleteYourPost
};

module.exports = {
  UserService,
  PostService,
};
