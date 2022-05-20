// Array for users who rtd, liked, follow, are followed
// 2 functions:
//1. Post -> User Array who rt this post ; User Array who liked this post
//2. UserId (your own or that of the profile User) -> User who follow UserId; User who are followed by UserId

const { ObjectId } = require("mongodb");
const { PostDAO, UserDAO } = require(".");
const { doAuthMiddleware } = require("../auth/doAuthMiddleware");
const { userRouter } = require("../routes/user-routes");
const { UserService } = require("../use-cases");
const { getDB } = require("./getDB");


//1
// async function findUserRTAndLikesOfPost(postId, likedOrRT) {
//     const db = getDB()
//     const Post = await db.collection("posts")
//         .findOne({
//             _id: new ObjectId(postId)
//         })
//     return UserArray
// }

// use-case
async function findUsersOfRtsAndLikes({ postId }, likedOrRT, userViewsId) {
    const post = await PostDAO.findPostById(postId)

    const mapArray = (likedOrRT) => {
        if (likedOrRT === "likes") {
            return post.likes.map(user => user.userId)
        } else if (likedOrRT === "retweets") {
            return post.retweets.map(user => user.userId)
        } else {
            console.log("could not read liked OrRT");
        }
    }

    const userArray = mapArray(likedOrRT)

    const userList = await UserDAO.findUsersByIdList(userArray)

    userList.map(u => {
        u.yourFollower = u.following.includes(userViewsId),
            u.youFollow = u.follower.includes(userViewsId)
    })

    const userListToUserListView = userList.map(user => ({
        _id: user._id,
        username: user.username,
        uniqueUsername: user.uniqueUsername,
        profilePicture: user.profilePicture,
        biography: user.biography,
        youFollow: user.youFollow,
        yourFollower: user.yourFollower
    }))

    return userListToUserListView
}


// routes: 
userRouter.get("/retweets:postId", doAuthMiddleware, async (req, res) => {

    try {
        const postId = req.params.postId
        const likedOrRT = "retweets"
        const result = await UserService.findUsersOfRtsAndLikes({ postId }, likedOrRT, req.userClaims.sub)

        res.status(200).json(result)
    } catch (err) {
        console.log("error Catch", err);
        res.status(500).json({ err: { message: err ? err.message : "Unknown Error while trying to see Users who rtd" } })
    }
})