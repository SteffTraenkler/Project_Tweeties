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

async function findAllPostsOfUserAndRts(userId) {
    const db = await getDB()
    const allPosts = await db.collection("posts")
        .find({
            $or: [
                { postedBy: userId },
                {
                    retweets: { $elemMatch: { userId } }
                }]
        })
        .sort({ postedAt: -1, }).toArray() //retweets.rtAt: -1
    return allPosts
}


async function findAllLikedPostsOfUser(userId) {
    const db = await getDB()
    const allLikedPosts = await db.collection("posts")
        .find({ likes: userId }).sort({ postedAt: -1 }).toArray()
    return allLikedPosts
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

async function deletePost(postId) {
    const db = await getDB()
    const deleteResult = await db.collection("posts").deleteOne({ _id: new ObjectId(postId) })
    return deleteResult
}

async function likePost(postId, userId) {
    const db = await getDB()

    const checkIfUserLiked = await db.collection("posts").findOne({
        $and:
            [{ _id: new ObjectId(postId) },
            { likes: { $elemMatch: { userId } } }
            ]
    })

    if (checkIfUserLiked) {
        ;
        const removeResult = await db.collection("posts").updateOne(
            { _id: new ObjectId(postId) },
            { $pull: { likes: { userId: userId } } }  //elemMatch -> bei Objekt  -> funktioniert nicht lol. Kann keine ID aus einem Objekt lesen und beide rausnehmen
            // {likes:{$elemMatch: {userId}}}
        )
        return removeResult
    }

    if (!checkIfUserLiked) {

        const userInfo = {
            userId: userId,
            likedAt: Date.now()
        }

        const insertionResult = await db.collection("posts").updateOne(
            { _id: new ObjectId(postId) },
            { $push: { likes: userInfo } }
        )
        return insertionResult
    }
}


async function retweetPost(postId, userId) {
    const db = await getDB()

    const checkIfUserRTd = await db.collection("posts").findOne({
        $and: [
            { _id: new ObjectId(postId) },
            { retweets: { $elemMatch: { userId } } }
        ]
    })
    if (checkIfUserRTd) {
        const removeResult = await db.collection("posts").updateOne(
            { _id: new ObjectId(postId) },
            { $pull: { retweets: { userId: userId } } } //elemMatch -> bei Objekt  -> funktioniert nicht lol. Kann keine ID aus einem Objekt lesen und beide rausnehmen
        )
        return removeResult
    }

    if (!checkIfUserRTd) {

        const userInfo = {
            userId: userId,
            rtdAt: Date.now()
        }

        const insertionResult = await db.collection("posts").updateOne(
            { _id: new ObjectId(postId) },
            { $push: { retweets: userInfo } }
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
    likePost,
    findAllPostsOfUserAndRts,
    retweetPost,
    findAllLikedPostsOfUser,
    deletePost
}

