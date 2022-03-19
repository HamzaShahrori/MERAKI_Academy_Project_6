const connection = require("../database/db");
const bcrypt = require("bcrypt");
const salt = 10;
const createNewUser = async (req, res) => {
  const {
    firstName,
    lastName,
    country,
    email,
    pass,
    reservation,
    publishing,
    role_id,
  } = req.body;

  const hashingPassword = await bcrypt.hash(pass, salt);

  const query = `INSERT INTO users (firstName,lastName,country,email,pass,reservation,publishing,role_id) VALUES (?,?,?,?,?,?,?,?)`;

  const data = [
    firstName,
    lastName,
    country,
    email,
    hashingPassword,
    reservation,
    publishing,
    role_id,
  ];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        message: `The email already exists`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Success User Added`,
      result: result,
    });
  });
};
module.exports = {
  createNewUser,
};
