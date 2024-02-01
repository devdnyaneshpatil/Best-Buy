const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const { generateToken } = require("../config/token");

const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please Enter Valid Credentials!" });
    return;
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      bcrypt.hash(password, 3, async (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          res.status(400).json({ msg: err.message });
          return;
        }
        const newUser = new UserModel({ name, email, password: hash, pic });
        newUser.save();
        const token = generateToken(newUser._id);
        res.status(200).json({
          msg: "User Has Been Added Successfully!",
          user: {
            _id: newUser._id,
            email: newUser.email,
            pic: newUser.pic,
            name: newUser.name,
            token: token,
          },
        });
      });
    } else {
      res.status(200).json({ msg: "User Already Exist!" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "Please Enter Valid Credentials" });
    return;
  }
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        // result == true
        if (result) {
          const token = generateToken(user._id);
          res.status(200).json({
            msg: "Login Successfull",
            user: {
              _id: user._id,
              email: user.email,
              pic: user.pic,
              name: user.name,
              token: token,
            },
          });
        } else {
          res.status(400).json({ msg: "Please Check Your Password" });
        }
      });
    } else {
      res.status(200).json({ msg: "User Doesn't Exist!!" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// const getUser = async (req, res) => {
//   //console.log(req.user)
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } },
//           { email: { $regex: req.query.search, $options: "i" } },
//         ],
//       }
//     : {};
//   try {
//     const users = await UserModel.find(keyword).find({
//       _id: { $ne: req.user._id },
//     });
//     res.status(200).json({ msg: users });
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

const getCart=async(req,res)=>{
   try {
      const user=await UserModel.findOne({_id:req.user._id}).populate('cart')
      res.status(200).json({msg:user.cart})
   } catch (error) {
      res.status(400).json({msg:error.message})
   }
}

const addToCart = async (req, res) => {
  const productId = req.params.id;
  try {
    const user = await UserModel.findOne({ _id: req.user._id });
    if (user.cart.includes(productId)) {
      res.status(200).json({
        msg: "Product Is Already In Cart",
      });
    } else {
      const added=await UserModel.findByIdAndUpdate(user._id,{$push:{cart:productId}},{new:true})
      res.status(200).json({msg:"Product added To the cart",user:added})
    }
  } catch (error) {
    res.status(400).json({msg:error.message})
  }
};

const removeFromCart = async (req, res) => {
  const productId = req.params.id;
  try {
    const user = await UserModel.findOne({ _id: req.user._id });
    if (!user.cart.includes(productId)) {
      res.status(200).json({
        msg: "Product Not in the Card",
      });
    } else {
      const removed = await UserModel.findByIdAndUpdate(
        user._id,
        { $pull: { cart: productId } },
        { new: true }
      );
      res
        .status(200)
        .json({ msg: "Product removed from the cart", user: removed });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  addToCart,
  removeFromCart,
  getCart,
};
