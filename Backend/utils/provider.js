const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const connectPassport = () => {
  console.log(process.env.GOOGLE_CLIENT_ID);
  console.log(process.env.GOOGLE_CLIENT_SECRET);
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:1111/api/auth/loggedin",
      },
      async (accessToken, refreshToken, profile, done) => {
        //database

        try {
          console.log(profile);
          //if user is not present
          const existUser = await User.findOne({
            email: profile.emails[0].value,
          });
          if (existUser) {
            const token = jwt.sign(
              { email: existUser.email, role: existUser.role },
              process.env.JWT_SECRET,
              { expiresIn: "7d" }
            );
            done(null, existUser, token);
            return;
          }
          const generatepassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
          const hashPassword = await bcrypt.hash(generatepassword, 10);

          const newUser = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: hashPassword,
          });
          const userObject = newUser.toObject();
          delete userObject.password;
          const token = jwt.sign(
            { email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );

          done(null, userObject, token);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  passport.deserializeUser(async (email, done) => {
    try {
      const user = await User.findOne({ email });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
module.exports = connectPassport;
