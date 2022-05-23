const { UserDAO } = require("../db-access")

async function editProfile(userId, editProfilInfo) {
    
    const updateResult = await UserDAO.updateUser(userId, editProfilInfo)
    
    return updateResult
}

module.exports = {
    editProfile,
}