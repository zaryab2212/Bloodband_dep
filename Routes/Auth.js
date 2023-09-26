const express = require("express");
const { register, login, currentuser } = require("../Controllers/Auth");
const Authenticated = require("../Middlewares/Authenticated");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/currentuser", Authenticated, currentuser);

module.exports = router;
