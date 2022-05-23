const express = require("express")
const multer = require("multer")


const { doAuthMiddleware } = require("../auth/doAuthMiddleware")
const { PostService } = require("../use-cases")
const { imageBufferToBase64 } = require("../utils/hash")

const postsRouter = express.Router()
const pictureUploardMiddleware = multer().single("picture")

postsRouter.get("/feed", doAuthMiddleware, async (req, res) => {

    try {
        const result = await PostService.listMainFeed(req.userClaims.sub)

        res.status(200).json(result)

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while loading feed" } })
    }
})

postsRouter.get("/:postId", doAuthMiddleware, async (req, res) => {

    try {
        const postId = req.params.postId
        const result = await PostService.showPost({ postId }, req.userClaims.sub)

        res.status(200).json(result)

    } catch (err) {
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while loading post." } })
    }
})

postsRouter.post("/add",
    doAuthMiddleware,
    pictureUploardMiddleware,
    async (req, res) => {

        try {

            const pictureBase64 = () =>
                req.file ?
                    imageBufferToBase64(req.file.buffer, req.file.mimetype)
                    : undefined


            const result = await PostService.addPost({
                postText: req.body.postText,
                picture: pictureBase64(),
                postedBy: req.userClaims.sub  //token findet über subject den user
            })


            res.status(201).json(result)

        } catch (err) {
            console.log(err);
            res.status(500).json({ err: { message: err ? err.message : "Unknown error while adding a new post." } })
        }
    }
)

postsRouter.delete("/delete/post/:postId", doAuthMiddleware, async (req, res) => {
    try {
        const postId = req.params.postId
        const userViewsId = req.userClaims.sub

        const result = await PostService.deleteYourPost({ postId, userViewsId })

        res.status(200).json(result)

    } catch (err) {
        console.log("Error while trying to delete post", err);
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while trying to delete post." } })
    }
})

postsRouter.post("/like/:postId", doAuthMiddleware, async (req, res) => {

    try {
        const postId = req.params.postId
        const userId = req.userClaims.sub
        const result = await PostService.likePost({ postId, userId })

        res.status(200).json(result)

    } catch (err) {
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while liking posts." } })
    }
})

postsRouter.post("/retweet/:postId", doAuthMiddleware, async (req, res) => {

    try {
        const postId = req.params.postId
        const userId = req.userClaims.sub
        const result = await PostService.retweetPost({ postId, userId })

        res.status(200).json(result)

    } catch (err) {
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while retweeting post." } })
    }

})

module.exports = {
    postsRouter
}