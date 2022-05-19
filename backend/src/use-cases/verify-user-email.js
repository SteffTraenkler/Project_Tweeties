const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");

async function verifyUserEmail({ email, sixDigitCode }) {
    const foundUser = await UserDAO.findUserByEmail(email)
    if (!foundUser) {
        throw new Error("There was a problem verifiying this 6-digit-code.")
    }

    const user = makeUser(foundUser)

    const sixDigitCodeIsOkay = user.sixDigitVerificationCode === sixDigitCode
    if (!sixDigitCodeIsOkay) {
        throw new Error("Threre was a problem verifiying this 6-digit-code.")
    }

    const updateResult = await UserDAO.updateUser(user._id, { emailVerified: true })
    const emailVerified =
        updateResult.acknowledged === true &&
        updateResult.matchedCount === 1 &&
        updateResult.modifiedCount === 1
    
    if (!emailVerified) {
        throw new Error("Seems like there was a problem with your email verification... Maybe your account was already verified?")
    }

    return{} // dieser Endput soll einfach ein leeres Objekt schicken, wenn alles gepasst hat
}

module.exports = {
    verifyUserEmail
}