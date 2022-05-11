function userToUserView(user) {
    return {
        _id: user._id,
        profilePicture: user.profilePicture,
        username: user.username,
        uniqueUsername: user.uniqueUsername
    }
}

module.exports = {
    userToUserView
}