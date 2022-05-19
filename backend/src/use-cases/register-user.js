const { UserDAO } = require("../db-access")
const { createRandomSalt, createPasswordHash, generateRandomSixDigitCode } = require("../utils/hash")
const { makeUser } = require("../domain/User")
const { userToUserView } = require("./functions/userToUserView")
const { sendEmail } = require("../utils/sendEmail")

async function registerUser({ username, email, password, biography, uniqueUsername }) {
    const foundUser = await UserDAO.findUserByEmailOrUsernameOrUniqueUsername(username, email, biography, uniqueUsername)
    console.log(foundUser);
    if (foundUser) {
        const errorMessage = foundUser.username === username
            ? "Username" + username + " already taken!"
            : "Account with this email already exists!"
        throw new Error(errorMessage)
    }

    const passwordSalt = createRandomSalt()
    const passwordHash = createPasswordHash(password, passwordSalt)

    const sixDigitVerificationCode = generateRandomSixDigitCode()

    const user = makeUser({ username, email, passwordHash, passwordSalt, sixDigitVerificationCode, biography, uniqueUsername })
    const insertResult = await UserDAO.insertUser(user)

    const wasSuccessful = insertResult.acknowledged === true && insertResult.insertedId
    if (!wasSuccessful) {
        throw new Error("Registration failed, please try again.")
    }

    await sendEmailVerification(user)  //-> Email Code schicken

    const registeredUser = await UserDAO.findUserByID(insertResult.insertedId)
    const registeredUserView = userToUserView(registeredUser)
    return registeredUserView
}

async function sendEmailVerification(user) {
    return await sendEmail({
        to: user.email,
        subject: "Welcome to Tweety!",
        message: `
        Hello${user.username}!

        Welcome to Tweety! We'd love to have you here!

        Pick your axe and your pitchforks and torches and get ready for battle - we mean...
        ...share some short stuff about yourself or political views.

        To start with the fun, please verify your account first by using the following code on Tweety:

        <h1>${user.sixDigitVerificationCode}</h1>

        Have blood...err...fun!
        `

    })
}

module.exports = {
    registerUser
}