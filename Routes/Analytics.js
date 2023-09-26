const express = require("express");
const { getbloodGroups } = require("../Controllers/Analytics");
const Authenticated = require("../Middlewares/Authenticated");
const router = express.Router();

router.get("/get_bloodgroup", Authenticated, getbloodGroups);

module.exports = router;
