const { UserDAO } = require("../db-access");

async function findFollowerAndFollowing(
    { userId, followOrFollowing, userViewsId }) {

    const user = await UserDAO.findUserByID(userId)

    const searchArray = (followOrFollowing) => {
        if (followOrFollowing === "following") { //wem folge ich?
            return user.following
        } else if (followOrFollowing === "follower") { //wer folgt mir?
            return user.follower
        }
        console.log("could not read followOrFollowing");
    }

    const userArray = searchArray(followOrFollowing)

    const userList = await UserDAO.findUsersByIdList(userArray)

    const userListToUserListView = userList.map(user => ({
        _id: user._id,
        username: user.username,
        uniqueUsername: user.uniqueUsername,
        profilePicture: user.profilePicture,
        biography: user.biography,
        youFollow: user.follower.includes(userViewsId),
        yourFollower: user.following.includes(userViewsId)
    }))

    return userListToUserListView

}


module.exports = {
    findFollowerAndFollowing
}