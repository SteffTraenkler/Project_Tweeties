//to follow someone.
//-> Frontend checks if profileUserId (req.UserClaims.sub) ist the same as the user Id of the Profile thats been looked at. If not, the Button Follow/Unfollow is diplayed.
// a Follow has to be stored inside Follower-Array of Follow-target and in the Following-Array of the User who follows.

import { ObjectId } from "mongodb";
import { getDB } from "./getDB";

//maybe like likePost??

async function followUser(yourUserId, targetUserId) {
    const db = await getDB()

    const checkIfUserFollows = await db.collection("users").findOne({
        $and: [
            { _id: new ObjectId(targetUserId) },
            { follower: yourUserId }
        ]
    })

    if (checkIfUserFollows) {
        const removeResult = Promise.all( //removeResult wird automatisch ein Array
            await db.collection("users").updateOne(
                { _id: new ObjectId(targetUserId) },
                { $pull: { follower: yourUserId } }
            ),
            await db.collection("users").updateOne(
                { _id: new ObjectId(yourUserId) },
                { $pull: { following: targetUserId } }
            )
        )
        return removeResult
    }

    if (!checkIfUserFollows) {
        const insertionResult = Promise.all(
            await db.collection("users").updateOne(
                { _id: new ObjectId(targetUserId) },
                { $push: { follower: yourUserId } }
            ),
            await db.collection("users").updateOne(
                { _id: new ObjectId(yourUserId) },
                { $push: { following: targetUserId } }
            )
        )
        return insertionResult
    }
}