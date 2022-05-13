const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { userToUserView } = require("./functions/userToUserView");

async function showProfileInfo({ userId }) {
  const foundUser = await UserDAO.findUserByID(userId);
  if (!foundUser) {
    throw new Error("User doesn't exist anymore");
  }

  const user = makeUser(foundUser);
  const userView = userToUserView(user);

  return userView;
}

module.exports = {
  showProfileInfo,
};
