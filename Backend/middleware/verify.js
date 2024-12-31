const verify = (req, res, next) => {
  const token = req.cookies;
  if (!token) {
    return res.status(401).json("You need to login");
  }
  next();
};
