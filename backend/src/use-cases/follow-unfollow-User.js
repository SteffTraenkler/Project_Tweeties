const { UserDAO } = require("../db-access");

async function followUnfollowUser({ yourUserId, targetUserId }) {
    const [foundYou, foundTargetUser] = await Promise.all([
        UserDAO.findUserByID(yourUserId),
        UserDAO.findUserByID(targetUserId)
    ])

    if (!foundYou) {
        throw new Error("Your ID does not exist!")
    }

    if (!foundTargetUser) {
        throw new Error("User doesn't exist anymore...")
    }

    const result = await UserDAO.followUser(yourUserId, targetUserId)

    return result
}

module.exports = {
    followUnfollowUser
}