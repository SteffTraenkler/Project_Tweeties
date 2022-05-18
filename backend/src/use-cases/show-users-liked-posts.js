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

    likedposts.map(item => {
        item.likedByUser = item.likes.some(u => u.userId === userViewsId),
            item.rtByUser = item.retweets.some(u => u.userId === userViewsId)
    })

    return { ...userView, likedposts }
}

module.exports = {
    showUsersLikedPosts
}