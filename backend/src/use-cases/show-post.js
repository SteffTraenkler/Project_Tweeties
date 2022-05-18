const { PostDAO, UserDAO } = require("../db-access");
const { makePost } = require("../domain/Post");
const { makeUser } = require("../domain/User");


async function showPost({ postId }, userViewsId) {
    const foundPost = await PostDAO.findPostById(postId)
    if (!foundPost) {
        throw new Error("Post with provided id not found..")
    }

    const post = makePost(foundPost)
    const foundUser = await UserDAO.findUserByID(post.postedBy)
    if (!foundUser) {
        throw new Error("User who posted this not found anymore...")
    }

    const user = makeUser(foundUser)

    let likedByUser = post.likes.some(u => u.userId === userViewsId)
    let rtByUser = post.retweets.some(u => u.userId === userViewsId)

    return {
        ...post, // Post-Objekte komplett übernehmen
        likedByUser,
        rtByUser,
        postedBy: { //-> postedBy ersetzen/überschreiben um nur die relevanten Daten weiterzugeben
            _id: user._id,
            profilePicture: user.profilePicture,
            username: user.username,
            uniqueUsername: user.uniqueUsername
        }
    }
}

module.exports = {
    showPost
}