const express = require("express");
const dotenv = require("dotenv");
const app = express();
const authRoute = require("./routes/auth.route");
const mongoose = require("mongoose");
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });

app.use(express.json());
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

app.listen(process.env.PORT, () => {
  console.log("Server running ");
});
