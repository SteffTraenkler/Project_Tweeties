const { PostDAO, UserDAO } = require("../db-access");

async function listMainFeed(userViewsId) {
    const allPosts = await PostDAO.findAllPosts()

    const allUserIdsWhoPosted = allPosts.map(post => post.postedBy)
    const userList = await UserDAO.findUsersByIdList(allUserIdsWhoPosted)

    const userListToUserListView = userList.map(user => ({
        _id: user._id,
        username: user.username,
        uniqueUsername: user.uniqueUsername,
        profilePicture: user.profilePicture
    }))

    allPosts.map(item => {
        item.likedByUser = item.likes.some(u => u.userId === userViewsId),
            item.rtByUser = item.retweets.some(u => u.userId === userViewsId)
    })

    const mainFeedPosts = allPosts.map(post => ({
        ...post, //nutze alle Felder von Post
        postedBy: userListToUserListView.find(u => u._id.toString() === post.postedBy)   //überschreibe postedBy mit Userinfos ( username, uniqueUsername, profilePicture)
    }))

    return mainFeedPosts
}

module.exports = {
    listMainFeed
}