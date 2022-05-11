const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { createPasswordHash, createToken } = require("../utils/hash");


async function loginUser({ username, password }) {
    //username can be email, usernam or uniqueUsername

    const foundUser = await UserDAO.findUserByEmailOrUsernameOrUniqueUsername(username, username, username)
    if (!foundUser) {
        throw new Error("There was a problem logging in")
    }

    const user = makeUser(foundUser)
    const passwordHash = createPasswordHash(password, user.passwordSalt)
    const passwordIsValid = passwordHash === user.passwordHash

    if (!passwordIsValid) {
        throw new Error("There was a problem logging in")
    }

    if (!user.emailVerified) {
        throw new Error("Please verify your E-Mail with the 6-digit-code we sent you")
    }

    const TEN_MINUTES = 60 * 10
    const token = createToken(user, "access", TEN_MINUTES)

    const ONE_DAY = 60 * 60 * 24
    const refreshToken = createToken(user, "refresh", ONE_DAY)

    return { token, refreshToken }
}

module.exports = {
    loginUser
}