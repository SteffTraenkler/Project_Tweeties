const { PostDAO } = require("../db-access");
const { makePost } = require("../domain/Post");

async function addPost({ postText, picture, postedBy }) {
    const newPost = makePost({ postText, picture, postedBy })

    const insertResult = await PostDAO.insertPost(newPost)
    const wasSuccessful = insertResult.acknowledged === true && insertResult.insertedId
    if (!wasSuccessful) {
        throw new Error("Adding a new post failed, please try again (also: sorry, it was probably not your fault.).")
    }

    const foundPost = PostDAO.findPostById(insertResult.insertedId)
    return foundPost
}

module.exports = {
    addPost
}