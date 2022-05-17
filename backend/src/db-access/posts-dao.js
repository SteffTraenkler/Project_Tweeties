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


///dupliziere findAllPostsOfUser -> nutze aggregate mit map und filter, um die Posts, in denen in den Likes die UserId steckt auszugeben. Teste in der MongoDB Shell die Kombination aus find und aggregate (findAllPostsOfUser -> find({postedBy: userId} + aggregate: map posts -> filter posts.retweets === userId)) <- zusammen, damit die Posts in Reihenfolge angezeigt werden und nicht RTs und eigene Posts einzeln.

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

    const checkUser = await db.collection("posts").findOne({ $and: [{ _id: new ObjectId(postId) }, { likes: userId }] })
    if (checkUser) {
        const removeResult = await db.collection("posts").update(
            { _id: new ObjectId(postId) },
            { $pull: { likes: userId } }
        )
        return removeResult
    }

    if (!checkUser) {
        const insertionResult = await db.collection("posts").updateOne(
            { _id: new ObjectId(postId) },
            { $push: { likes: userId } }
        )
        return insertionResult
    }
}


async function likeArray(postId) {
    const db = await getDB()

    const resultArray = await db.collection("posts").findOne([{ _id: new ObjectId(postId) }, { likes: 1 }])
    return resultArray
}

// zu likeArray: create pipeline to match Ids in likes with userinfo -> note!!: ids in Array MUST be ObjectIds

module.exports = {
    findAllPosts,
    findAllPostsOfUser,
    findPostById,
    insertPost,
    likePost
}

