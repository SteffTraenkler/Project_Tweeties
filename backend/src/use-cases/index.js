const { registerUser } = require("./register-user")
const { loginUser } = require("./login-user")
const { refreshUserToken } = require("./refresh-user-token")
const { listAllUsers } = require("./list-all-users")

const UserService = {
    registerUser,
    loginUser,
    refreshUserToken,
    listAllUsers
}

module.exports = {
    UserService
}