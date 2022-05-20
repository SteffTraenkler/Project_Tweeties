
function sortPostsByTime(posts, viewedUserId) {


    const sortedPosts = posts.map(post => {
        const retweetObj = post.retweets.find(rt => rt.userId === viewedUserId.toString())

        const sortByTimestamp = retweetObj ? retweetObj.rtdAt : post.postedAt

        return {
            ...post,
            sortByTimestamp
        }
    }).sort((post1, post2) => post2.sortByTimestamp - post1.sortByTimestamp)

    return sortedPosts

}

module.exports = {
    sortPostsByTime
}