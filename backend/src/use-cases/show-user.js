const { UserDAO, PostDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { userToUserView } = require("./functions/userToUserView");

async function showUser({ username }) {
  const foundUser = await UserDAO.findUserByUsername(username);
  if (!foundUser) {
    throw new Error("User doesn't exist anymore");
  }

  const user = makeUser(foundUser);
  const userView = userToUserView(user);

  const posts = await PostDAO.findAllPostsOfUserAndRts(user._id.toString());
  posts.map(item => {
    item.likedByUser = item.likes.includes(user._id.toString()),
      item.rtByUser = item.retweets.includes(user._id.toString())
  })

  return { ...userView, posts };
}

module.exports = {
  showUser,
};
