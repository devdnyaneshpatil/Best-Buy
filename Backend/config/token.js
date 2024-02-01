const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = { generateToken, validateToken };
