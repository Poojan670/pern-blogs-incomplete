const jwt = require("jsonwebtoken");

const generateAuthToken = function (user) {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "10m",
    }
  );
  return token;
};

const generateAuthRefreshToken = function (user) {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

const generateVerificationToken = function (user_id) {
  const verifyToken = jwt.sign(
    {
      id: user_id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "10m" }
  );
  return verifyToken;
};

module.exports = {
  generateAuthToken,
  generateVerificationToken,
  generateAuthRefreshToken,
};
