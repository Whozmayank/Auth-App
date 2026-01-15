const JWT = require("jsonwebtoken");

const generateToken = (user) => {
  return JWT.sign({ _id: user._id }, process.env.JWT_Secret, {
    expiresIn: "1d",
  });
};

module.exports = generateToken;
