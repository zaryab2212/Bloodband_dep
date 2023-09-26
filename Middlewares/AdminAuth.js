const User = require("../Model/User");

exports.AdminAuth = async (req, res, next) => {
  console.log(req.body);
  try {
    const adminAcc = await User.findById({ _id: req.body.userId });
    console.log("checking admi", adminAcc);
    if (!adminAcc && !adminAcc.role === "admin") {
      return res.status(401).json({
        status: false,
        message:
          "This is not an Admin account please login with admin credentials",
        error,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: false,
      message:
        "This is not an Admin account please login with admin credentials",
      error,
    });
  }
};
