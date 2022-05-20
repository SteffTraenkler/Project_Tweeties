

const defaultUserPic =
  "data:image/png;base64,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";



function makeUser(


  
  {
  _id,
  profilePicture,
  username,
  uniqueUsername,
  email,
  emailVerified = false, // default value = false
  passwordHash,
  passwordSalt,
  sixDigitVerificationCode,
  biography = biography || "",
  following = [],
  follower = []
  }) {
  

  if (!username) {
    throw new Error("Username must exist.");
  }


  function generateUserNumber() {
    return Math.random().toString().slice(2, 8)
}

  if (!email) {
    throw new Error("E-Mail must exist");
  }

  console.log(
    "-------------------------------------------------------------",
    uniqueUsername || "@TwitterUser" + generateUserNumber(),
    uniqueUsername,
  );
  
  return {
    _id,
    profilePicture: profilePicture || defaultUserPic,
    username,
    uniqueUsername: uniqueUsername || "@TwitterUser" + generateUserNumber(),
    email,
    emailVerified,
    passwordHash,
    passwordSalt,
    sixDigitVerificationCode,
    biography,
    follower,
    following,
  };
}

module.exports = {
  makeUser,
};
