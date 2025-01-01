const express = require("express");
const route = express.Router();
const { signUp, signIn, signOut } = require("../controller/auth.controller");
const passport = require("passport");
route.post("/signup", signUp);
route.post("/signin", signIn);
route.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
route.get(
  "/loggedin",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    // Set the cookie here
    res.cookie("access_token", req.authInfo, {
      // req.authInfo contains the token
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //
      httpOnly: true,
    });

    res.redirect("http://localhost:1111/"); // Your success redirect
  }
);
route.get("/logout", signOut);

module.exports = route;
