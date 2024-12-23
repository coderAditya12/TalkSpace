const express = require("express");
const route = express.Router();
const { signUp,signIn } = require("../controller/auth.controller");
route.post("/signup", signUp);
route.post("/signin", signIn);
module.exports = route;
