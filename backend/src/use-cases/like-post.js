const { UserDAO, PostDAO } = require("../db-access");

async function likePost({ postId, userId }) {
    const [foundUser, foundPost] = await Promise.all([
        UserDAO.findUserByID(userId),
        PostDAO.findPostById(postId)
    ])

    if (!foundPost) {
        throw new Error("Post not found.")
    }

    if (!foundUser) {
        throw new Error("User doesn't exist anymore...")
    }

    const result = await PostDAO.likePost(postId, userId)

    return result
}

module.exports = {
    likePost
}