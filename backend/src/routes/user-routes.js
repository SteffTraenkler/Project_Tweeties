const express = require("express");

const { body } = require("express-validator");
const { doAuthMiddleware } = require("../auth/doAuthMiddleware");
const { doValidations } = require("../facade/doValidations");
const { UserService } = require("../use-cases");

const userRouter = express.Router();

// Authentication Required!!!
userRouter.get("/all", async (_, res) => {
  try {
    const allUsers = await UserService.listAllUsers();
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
    const allUsers = await UserService.showUser({ username });
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err, "hier gehts nicht weiter");
    res.status(500).json({
      err: {
        message: err ? err.message : "Unknown error while loading Profile.",
      },
    });
  }
});

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

module.exports = {
  userRouter,
};
