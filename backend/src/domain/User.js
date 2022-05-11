import { birdie } from "../assets/img/Birdie.png"

function makeUser({
    _id,
    profilePicture,
    username,
    uniqueUsername,
    email,
    emailVerified = false,
    passwordHash,
    passwordSalt,
    sixDigitVerificationCode
}) {
    if (!username) {
        throw new Error("Username must exist.")
    }

    if (!email) {
        throw new Error("E-Mail must exist")
    }

    return {
        _id,
        profilePicture: profilePicture || birdie,
        username,
        uniqueUsername,
        email,
        emailVerified,
        passwordHash,
        passwordSalt,
        sixDigitVerificationCode
    }
}

module.exports = {
    makeUser
}