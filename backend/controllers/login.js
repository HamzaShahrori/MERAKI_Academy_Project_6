const bcrypt = require("bcrypt");
const connection = require("../database/db");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.pass;

  const query = `SELECT * FROM roles INNER JOIN users ON users.role_id=roles.id WHERE email=? `;
  const data = [email];

  connection.query(query, data, async (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    if (result == undefined) {
      res.json({ message: "await" });
    }
    if (!result[0]) {
      return res.status(404).json({
        success: false,
        message: `The email doesn't exist`,
      });
    }
    const valid = await bcrypt.compare(password, result[0].pass);
    if (!valid) {
      return res.status(403).json({
        success: false,
        message: `The password you’ve entered is incorrect`,
      });
    }
    const payload = {
      userId: result[0].id,
      role: result[0].role_id,
    };
    const options = {
      expiresIn: "60h",
    };

    const token = await jwt.sign(payload, process.env.SECRET, options);
    res.status(200).json({
      success: true,
      message: `Valid login credentials`,
      token: token,
      role: payload.role,
      userId: payload.userId,
      result: result,
    });
  });
};

module.exports = { login };
