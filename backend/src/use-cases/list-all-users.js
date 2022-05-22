const { UserDAO } = require("../db-access");
const { userToUserView } = require("./functions/userToUserView");


async function listAllUsers({ userViewsId }) {
    const allUsers = await UserDAO.findAllUsers()

    const allUsersView = allUsers.map(user => ({
        _id: user._id,
        username: user.username,
        uniqueUsername: user.uniqueUsername,
        profilePicture: user.profilePicture,
        biography: user.biography,
        youFollow: user.follower.includes(userViewsId),
        yourFollower: user.following.includes(userViewsId)
    }))
    return allUsersView
}

module.exports = {
    listAllUsers
}