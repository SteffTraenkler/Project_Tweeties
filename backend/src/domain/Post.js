function makePost({
    _id,
    postText,
    picture,
    likes = [],
    retweets = [],
    comments = [],
    postedAt = Date.now(),
    postedBy
}) {
    if (!postText && !picture) {
        throw new Error("You cannot post empty!")
    }

    if (!postedBy) {
        throw new Error("Post must include user who posted it.")
    }

    if (!postedAt) {
        throw new Error("Post must include timestamp of creation! (Praise Chronos)")
    }

    return {
        _id,
        postText,
        picture,
        likes,
        retweets,
        comments,
        postedAt,
        postedBy
    }
}

module.exports = {
    makePost
}