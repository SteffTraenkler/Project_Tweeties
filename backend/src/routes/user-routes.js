const express = require("express");
const multer = require("multer")

const { body } = require("express-validator");
const { doAuthMiddleware } = require("../auth/doAuthMiddleware");
const { doValidations } = require("../facade/doValidations");
const { UserService } = require("../use-cases");
const { imageBufferToBase64 } = require("../utils/hash");
const pictureUploardMiddleware =  multer().single("profilePicture")



const userRouter = express.Router();

// Authentication Required!!!
userRouter.get("/all", doAuthMiddleware, async (req, res) => {
  try {
    const allUsers = await UserService.listAllUsers({ userViewsId: req.userClaims.sub });
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: {
        message: err ? err.message : "Unknown error while loading all users.",
      },
    });
  }
});

// Profil Info & User ProfileID
userRouter.get("/myProfileInfo", doAuthMiddleware, async (req, res) => {
  try {
    const userId = req.userClaims.sub; // an den token wird erkannt, um welchen user es sich handelt
    const allUsers = await UserService.showProfileInfo({ userId });

    res.status(200).json(allUsers); // 200 Means Anfrage is Erfolgreich verlaufen
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: error
          ? error.message
          : "Unkown error while loading your Profile.",
      },
    });
  }
});


userRouter.get("/profile/:username", doAuthMiddleware, async (req, res) => {
  try {
    const username = req.params.username;

    const allUsers = await UserService.showUser({ username }, req.userClaims.sub);

    res.status(200).json(allUsers);
  } catch (err) {
    console.log("error catch in showUser Route", err);
    res.status(500).json({
      err: {
        message: err ? err.message : "Unknown error while loading Profile.",
      },
    });
  }
});

userRouter.put("/profile/editProfile", doAuthMiddleware, pictureUploardMiddleware, async (req, res) => {
  try {
    const userId = req.userClaims.sub;


    const profileEditInfo = req.body
    if(req.file) {
    profileEditInfo.profilePicture = imageBufferToBase64(req.file.buffer, req.file.mimetype)
}

    const allEdits = await UserService.editProfile(userId, req.body, profileEditInfo)
    

    console.log(req.body);
    console.log(req.file);


    res.status(200).json(allEdits)
  } catch (err) {
    console.log("error catch inside editProfile Route", err);
    res.status(500).json(
      {
        err: {
          message: err ? err.message : "Unknown error while editing Profile.",
        },
      }
    )
  }
})

userRouter.get("/profile/likes/:username", doAuthMiddleware, async (req, res) => {
  try {
    const username = req.params.username
    const allUsers = await UserService.showUsersLikedPosts({ username }, req.userClaims.sub)

    res.status(200).json(allUsers)

  } catch (err) {
    res.status(500).json({ err: { message: err ? err.message : "Unknown error while loading liked posts" } })
  }
})

//Login & Registration!!
userRouter.post(
  "/login",
  body("username").isLength({ min: 1, max: 50 }),
  body("password").isStrongPassword(),
  doValidations,

  async (req, res) => {
    try {
      const result = await UserService.loginUser({
        username: req.body.username,
        password: req.body.password,
      });

      if (result.refreshToken) {
        req.session.refreshToken = result.refreshToken;
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({
        err: {
          message: err ? err.message : "Unknown error while logging in.",
        },
      });
    }
  }
);

userRouter.post("/verifyEmail",
  // facade layer
  body("email").isEmail(),
  body("sixDigitCode").isLength({ min: 6 }),
  doValidations,
  async (req, res) => {
    try {
      const email = req.body.email
      const sixDigitCode = req.body.sixDigitCode
      const result = await UserService.verifyUserEmail({ email, sixDigitCode })
      res.status(200).json(result)
    } catch (error) {
      console.log(err);
      res.status(500).json({ err: { message: err ? err.message : "Unknown error while verifying your email." } })
    }
  }

)

userRouter.post("/refreshtoken", async (req, res) => {
  try {
    const result = await UserService.refreshUserToken({
      refreshToken: req.session.refreshToken || req.body.refreshToken, // -> session oft bei mobilen Geräten nicht möglich
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      err: {
        message: err
          ? err.message
          : "Unknown error while refreshing your token.",
      },
    });
  }
});

userRouter.post(
  "/register",
  body("username").isLength({ min: 1, max: 35 }),
  body("email").isEmail(),
  body("password").isStrongPassword(),
  doValidations,

  async (req, res) => {
    try {
      const userInfo = req.body;
      const result = await UserService.registerUser(userInfo);

      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        err: {
          message: err
            ? err.message
            : "Unknown error while registering a new account",
        },
      });
    }
  }
);

//UserInteraktion

userRouter.post("/follow/:userId", doAuthMiddleware, async (req, res) => {

  try {
    const yourUserId = req.userClaims.sub
    const targetUserId = req.params.userId
    const result = await UserService.followUnfollowUser({ yourUserId, targetUserId })

    res.status(200).json(result)

  } catch (err) {
    console.log(err);
    res.status(500).json({ err: { message: err ? err.message : "Unkown error while trying to follow." } })
  }

})


//List of Users who rt, like, follow or are followed
userRouter.get("/retweets/:postId", doAuthMiddleware, async (req, res) => {

  try {

    const result = await UserService.findUsersOfRtsAndLikes({ postId: req.params.postId, likedOrRT: "retweets", userViewsId: req.userClaims.sub })

    res.status(200).json(result)

  } catch (err) {
    console.log("error Catch in retweeting Users", err);
    res.status(500).json({ err: { message: err ? err.message : "Unknown Error while trying to see Users who rtd" } })
  }
})

userRouter.get("/likes/:postId", doAuthMiddleware, async (req, res) => {

  try {

    const result = await UserService.findUsersOfRtsAndLikes({ postId: req.params.postId, likedOrRT: "likes", userViewsId: req.userClaims.sub })

    res.status(200).json(result)

  } catch (err) {
    console.log("Error catch in liking Users", err);
    res.status(500).json({ err: { message: err ? err.message : "Unknown Error while trying to get Users who liked" } })

  }
})


userRouter.get("/following/:userId", doAuthMiddleware, async (req, res) => {

  try {

    const result = await UserService.findFollowerAndFollowing({ userId: req.params.userId, followOrFollowing: "following", userViewsId: req.userClaims.sub })

    res.status(200).json(result)

  } catch (err) {
    console.log("Error catch in seeing following Users", err);
    res.status(500).json({ err: { message: err ? err.message : "Unknown Error while trying to get Users who are followed" } })
  }

})

userRouter.get("/follower/:userId", doAuthMiddleware, async (req, res) => {

  try {

    const result = await UserService.findFollowerAndFollowing({ userId: req.params.userId, followOrFollowing: "follower", userViewsId: req.userClaims.sub })

    res.status(200).json(result)

  } catch (err) {
    console.log("Error catch in seeing Users who follow", err);
    res.status(500).json({ err: { message: err ? err.message : "Unknown error whilt trying to get Users who follow" } })
  }

})

module.exports = {
  userRouter,
};
