function userToUserView(user) {
    return {
        _id: user._id,
        profilePicture: user.profilePicture,
        username: user.username,
        uniqueUsername: user.uniqueUsername,
        biography: user.biography,
        follower: user.follower,
        following: user.following,
    }
}

module.exports = {
    userToUserView
}