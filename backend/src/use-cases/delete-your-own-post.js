const { PostDAO } = require("../db-access");

async function deleteYourPost({ postId, userViewsId }) {
    const post = await PostDAO.findPostById(postId)

    if (!post) {
        throw new Error("Post doesn't exist anymore...")
    }

    const userId = post.postedBy

    const postOwner = userId === userViewsId


    if (!postOwner) {
        throw new Error("User has no right to delete!!")
    }

    const deletedPost = await PostDAO.deletePost(post._id)

    return deletedPost
}

module.exports = {
    deleteYourPost
}