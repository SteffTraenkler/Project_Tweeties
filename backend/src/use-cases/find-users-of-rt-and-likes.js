const { PostDAO, UserDAO } = require("../db-access");

async function findUsersOfRtsAndLikes({ postId, likedOrRT, userViewsId }) {
    const post = await PostDAO.findPostById(postId)

    const mapArray = (likedOrRT) => {
        if (likedOrRT === "likes") {
            return post.likes.map(user => user.userId)
        } else if (likedOrRT === "retweets") {
            return post.retweets.map(user => user.userId)
        } else {
            console.log("could not read liked OrRT");
        }
    }

    const userArray = mapArray(likedOrRT)

    const userList = await UserDAO.findUsersByIdList(userArray)

    userList.map(u => {
        u.yourFollower = u.following.includes(userViewsId),
            u.youFollow = u.follower.includes(userViewsId)
    })

    const userListToUserListView = userList.map(user => ({
        _id: user._id,
        username: user.username,
        uniqueUsername: user.uniqueUsername,
        profilePicture: user.profilePicture,
        biography: user.biography,
        youFollow: user.youFollow,
        yourFollower: user.yourFollower
    }))

    return userListToUserListView
}

module.exports = {
    findUsersOfRtsAndLikes
}