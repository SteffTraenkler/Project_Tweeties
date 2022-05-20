const { PostDAO, UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { showUser } = require("./show-user");

async function listMainFeed(userViewsId) {
    const userViewObject = await UserDAO.findUserByID(userViewsId)

    if (!userViewObject) {
        throw new Error("User doesn't exist anymore or problem with token")
    }

    const viewingUser = makeUser(userViewObject)

    const allFollowingUsers = await UserDAO.findUsersByIdList(viewingUser.following)

    const allFeedUsers = [
        viewingUser,
        ...allFollowingUsers.map(user => makeUser(user))
    ]

    const showUserResults = await Promise.all(
        allFeedUsers.map(user => showUser({ username: user.username }, userViewsId))
    )

    const feedPosts = showUserResults.map(showUserResult => showUserResult.posts).flat() //flat nimmt alle Elemente von den Unterarrays raus und macht daraus ein großes Array --> [[{1},{2},{3}],[{4},{5}]].flat() -> [{1},{2},{3},{4},{5}]

    const sortedFeed = feedPosts.sort((post1, post2) => post2.sortByTimestamp - post1.sortByTimestamp)

    return sortedFeed
}

module.exports = {
    listMainFeed
}