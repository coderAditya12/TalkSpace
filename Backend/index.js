const express = require("express");
const dotenv = require("dotenv");
const app = express();
const authRoute = require("./routes/auth.route");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const connectPassport = require("./utils/provider");
const session = require("express-session");
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });

app.use(
  session({
    secret: "random",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
connectPassport();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      code: statusCode,
      message: message,
    },
  });
});
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(process.env.PORT, () => {
  console.log("Server running ");
});
