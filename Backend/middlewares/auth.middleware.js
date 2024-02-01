const { validateToken } = require("../config/token");
const UserModel = require("../models/user.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const decoded = validateToken(token);
    if (decoded) {
      const user = await UserModel.findOne({ _id: decoded.userId }).select(
        "-password"
      );
      req.user = user;
      next();
    }
  } else {
    res.status(200).json({ msg: "Please Login First" });
  }
};

module.exports = auth;
