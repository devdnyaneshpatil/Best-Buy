const express = require("express");
const {
  registerUser, 
  loginUser,
  getUser,
  addToCart,
  removeFromCart,
} = require("../controllers/user.controllers");
const auth = require("../middlewares/auth.middleware");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
// userRouter.get("/", auth, getUser);
userRouter.patch("/addToCart/:id",auth,addToCart)
userRouter.patch("/removeFromCart/:id", auth, removeFromCart);

module.exports = userRouter;
