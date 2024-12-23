const errorHandler = require("../middleware/error");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const signUp = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return errorHandler(res, 400, "All fields are required");
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return next(errorHandler(res, 400, "User already exists"));
    }
    //hash password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashPassword,
      username,
    });
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorHandler(res, 400, "All fields are required");
    }
    const exist = await User.findOne({ email });
    if (!exist) {
      return errorHandler(res, 400, "User not found");
    }
    const match = await bcrypt.compare(password, exist.password);
    if (!match) {
      return errorHandler(res, 400, "Invalid password");
    }
    const token = jwt.sign(
      { id: exist._id, email: exist.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userObj = exist.toObject();
    delete userObj.password;

    res
      .status(200)
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json(userObj);
  } catch (error) {
    next(error)
  }
};
module.exports = { signUp,signIn };
