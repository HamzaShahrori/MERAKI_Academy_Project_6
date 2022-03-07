const connection = require("../database/db");

const createNewRole = (req, res) => {
  const { role_name } = req.body;
  const query = `INSERT INTO roles (role_name) VALUES (?)`;

  const data = [role_name];

  connection.query(query, data, (err, result) => {
    console.log(result);

    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    res.status(201).json({
      success: true,
      message: `Sucess role created`,
      result: result,
    });
  });
};
module.exports = { createNewRole };
