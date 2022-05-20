const { UserDAO, PostDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { sortPostsByTime } = require("./functions/sort-posts-by-time");
const { userToUserView } = require("./functions/userToUserView");

async function showUser({ username }, userViewsId) {
  const foundUser = await UserDAO.findUserByUsername(username);

  if (!foundUser) {
    throw new Error("User doesn't exist anymore");
  }

  const user = makeUser(foundUser);
  const userView = userToUserView(user);

  const posts = await PostDAO.findAllPostsOfUserAndRts(user._id.toString());

  const allUserIdsWhoPosted = posts.map(post => post.postedBy)
  const userList = await UserDAO.findUsersByIdList(allUserIdsWhoPosted)

  const youFollow = userView.follower.includes(userViewsId)
  const yourFollower = userView.following.includes(userViewsId)


  const userListToUserListView = userList.map(user => ({
    _id: user._id,
    username: user.username,
    uniqueUsername: user.uniqueUsername,
    profilePicture: user.profilePicture,
    youFollow: user.follower.includes(userViewsId),
    yourFollower: user.following.includes(userViewsId)
  }))

  const finalPosts = posts.map(post => ({
    ...post, //nutze alle Felder von Post
    likedByUser: post.likes.some(u => u.userId === userViewsId),
    rtByUser: post.retweets.some(u => u.userId === userViewsId),
    postedBy: userListToUserListView.find(u => u._id.toString() === post.postedBy)   //überschreibe postedBy mit Userinfos ( username, uniqueUsername, profilePicture)
  }))

  const sortedPosts = sortPostsByTime(finalPosts, userView._id)

  return {
    ...userView,
    posts: sortedPosts,
    yourFollower,
    youFollow
  };
}

module.exports = {
  showUser,
};