const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

async function findAllPosts() {
    const db = await getDB()
    const allPosts = await db.collection("posts").find().sort({ postedAt: -1 }).toArray()
    return allPosts
}

async function findAllPostsOfUser(userId) {
    const db = await getDB()
    const allPosts = await db.collection("posts").find({ postedBy: userId }).sort({ postedAt: -1 }).toArray()
    return allPosts
}

async function findPostById(postId) {
    const db = await getDB()
    const foundPost = await db.collection("posts").findOne({ _id: new ObjectId(postId) })
    return foundPost
}

async function insertPost(post) {
    const db = await getDB()
    const insertionResult = await db.collection("posts").insertOne(post)
    return insertionResult
}

async function likePost(postId, userId) {
    const db = await getDB()
    const insertionResult = await db.collection("posts").updateOne(
        { _id: new ObjectId(postId) },
        { $push: { likes: userId } }
    )
    return insertionResult
}

module.exports = {
    findAllPosts,
    findAllPostsOfUser,
    findPostById,
    insertPost,
    likePost
}

