const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")

async function findAllUsers() {
    const db = await getDB()
    const allUsers = await db.collection("users").find().toArray()
    return allUsers
}

async function findUsersByIdList(userIdList) {
    const db = await getDB()
    const foundUserList = await db.collection("users").find({ _id: { $in: userIdList.map(id => new ObjectId(id)) } }).toArray()
    return foundUserList
}

async function findUserByID(userId) {
    const db = await getDB()
    const foundUser = await db.collection("users").findOne({ _id: new ObjectId(userId) })
    return foundUser
}

async function findUserByEmail(userEmail) {
    const db = await getDB()
    const foundUser = await db.collection("users").findOne({ email: userEmail })
    return foundUser
}

async function findUserByUsername(username) {
    const db = await getDB()
    const foundUser = await db.collection("users").findOne({ username: username })
    return foundUser
}

async function findUserByUniqueUsername(uniqueUsername) {
    const db = await getDB()
    const foundUser = await db.collection("users").findOne({ uniqueUsername: uniqueUsername })
    return foundUser
}

async function findUserByEmailOrUsernameOrUniqueUsername(username, email) {
    const db = await getDB()
    const foundUser = await db.collection("users").findOne({
        $or: [{ username: username }, { email: email }]
    })
    return foundUser
}

async function insertUser(userInfo) {
    const db = await getDB()
    const insertResult = await db.collection("users").insertOne(userInfo)
    return insertResult
}

async function updateUser(userId, updateInfo) {
    const db = await getDB()
    const updateResult = await db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateInfo }
    )
    return updateResult
}

async function followUser(yourUserId, targetUserId) {
    const db = await getDB()

    const checkIfUserFollows = await db.collection("users").findOne({
        $and: [
            { _id: new ObjectId(targetUserId) },
            { follower: yourUserId }
        ]
    })

    if (checkIfUserFollows) {
        const removeResult = await Promise.all([ //removeResult wird automatisch ein Array
            db.collection("users").updateOne(
                { _id: new ObjectId(targetUserId) },
                { $pull: { follower: yourUserId } }
            ),
            db.collection("users").updateOne(
                { _id: new ObjectId(yourUserId) },
                { $pull: { following: targetUserId } }
            )
        ])
        return removeResult
    }

    if (!checkIfUserFollows) {
        const insertionResult = await Promise.all([
            db.collection("users").updateOne(
                { _id: new ObjectId(targetUserId) },
                { $push: { follower: yourUserId } }
            ),
            db.collection("users").updateOne(
                { _id: new ObjectId(yourUserId) },
                { $push: { following: targetUserId } }
            )
        ])

        return insertionResult
    }
}

module.exports = {
    findAllUsers,
    findUsersByIdList,
    findUserByID,
    findUserByEmail,
    findUserByUsername,
    findUserByUniqueUsername,
    findUserByEmailOrUsernameOrUniqueUsername,
    insertUser,
    updateUser,
    followUser
}