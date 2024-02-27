const jwt = require("jsonwebtoken");
const User = require("../Model/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    // console.log("mytoken", token);

    jwt.verify(token, "myjwtsecretisher", (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "auth Faildytyt",
        });
      } else {
        req.body.userId = decode.userId;
        // console.log("req ki bosy id", req.body.userId);
        next();
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
      message: "Auth faildddddddddddddd",
    });
  }
};
