const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
      ],
      default: [],
    },
  },
  { timestaps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
