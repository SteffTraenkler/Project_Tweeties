const { UserDAO, PostDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { userToUserView } = require("./functions/userToUserView");


async function showUsersLikedPosts({ username }, userViewsId) {
    const foundUser = await UserDAO.findUserByUsername(username)

    if (!foundUser) {
        throw new Error("User doesn't exist anymore.")
    }

    const user = makeUser(foundUser)
    const userView = userToUserView(user)

    const likedposts = await PostDAO.findAllLikedPostsOfUser(user._id.toString())

    return {
        ...userView,
        likedByUser: likedposts.likes.some(u => u.userId === userViewsId),
        rtByUser: likedposts.retweets.some(u => u.userId === userViewsId)
    }
}

module.exports = {
    showUsersLikedPosts
}