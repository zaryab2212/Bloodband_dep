const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("finding user", user);

    if (user) {
      return res.status(200).json({
        success: false,
        message: "user already exist",
      });
    }
    // hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { ...req.body, password: hashedPassword };

    console.log("finding hash", hashedPassword);

    const myUser = await User.create(newUser);
    await myUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credential",
      });
    }
    //  compareing hashing Password
    const verfyPassword = await bcrypt.compare(password, user.password);
    if (!verfyPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credential pass",
        message2: "error in pass",
      });
    }
    // console.log("before jwt");
    const token = jwt.sign({ userId: user._id }, "myjwtsecretisher", {
      expiresIn: "1d",
    });
    return (
      res
        .status(200)
        // .cookie("jwtToken", token, {
        //   httpOnly: true,
        //   expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000),
        // })
        .json({
          success: true,
          message: "User logedIn",
          token,
          user,
        })
    );
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
      and: "this is error",
    });
  }
};

exports.currentuser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    // console.log("finding user", user);
    res.status(200).json({
      success: true,
      message: "user found",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
