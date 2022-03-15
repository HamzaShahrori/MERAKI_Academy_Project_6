const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "forbidden" });
    }
    const token = req.headers.authorization.split(" ").pop();
    const parsedToken = jwt.verify(token, process.env.SECRET);
    console.log(parsedToken);
    req.token = parsedToken;
    console.log(token);
    next();
  } catch (error) {
    res.status(403).json({ message: "server err" });
  }
};

module.exports = authentication;
