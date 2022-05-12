const { UserDAO } = require("../db-access");
const { userToUserView } = require("./functions/userToUserView");


async function listAllUsers() {
    const allUsers = await UserDAO.findAllUsers()
    const allUsersView = allUsers.map(user => userToUserView(user))
    return allUsersView
}

module.exports = {
    listAllUsers
}