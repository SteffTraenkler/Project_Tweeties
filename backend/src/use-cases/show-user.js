const { UserDAO, PostDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { userToUserView } = require("./functions/userToUserView");

async function showUser({ username }, userViewsId) {
  const foundUser = await UserDAO.findUserByUsername(username);



  if (!foundUser) {
    throw new Error("User doesn't exist anymore");
  }

  const user = makeUser(foundUser);
  const userView = userToUserView(user);

  const posts = await PostDAO.findAllPostsOfUserAndRts(user._id.toString());
  posts.map(item => {
    item.likedByUser = item.likes.includes(userViewsId),
      item.rtByUser = item.retweets.includes(userViewsId)
  })

    const allUserIdsWhoPosted = posts.map(post => post.postedBy)
    const userList = await UserDAO.findUsersByIdList(allUserIdsWhoPosted)

  const userListToUserListView = userList.map(user => ({
        _id: user._id,
        username: user.username,
        uniqueUsername: user.uniqueUsername,
        profilePicture: user.profilePicture
  }))

  const finalPosts = posts.map(post => ({
        ...post, //nutze alle Felder von Post
        postedBy: userListToUserListView.find(u => u._id.toString() === post.postedBy)   //überschreibe postedBy mit Userinfos ( username, uniqueUsername, profilePicture)
    }))
  
  
  return { ...userView, posts: finalPosts };
}

module.exports = {
  showUser,
};
