const connection = require("../database/db");

const getCountAllHalls = (req, res) => {
  const query = `SELECT  COUNT(id) AS "Address" FROM Halls  WHERE   Halls.is_deleted=0  `;

  connection.query(query, async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(404).json({
        success: false,
        message: `No Halls yet`,
      });
    }

    res.status(200).json({
      success: true,
      message: `All Halls In Amman`,
      result: result,
    });
  });
};

const getCountAmman = (req, res) => {
  const query = `SELECT  COUNT(id) AS "Address" FROM Halls  WHERE  Halls.hall_address='Amman' &&  Halls.is_deleted=0  `;

  connection.query(query, async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(404).json({
        success: false,
        message: `No Halls yet`,
      });
    }

    res.status(200).json({
      success: true,
      message: `All Halls In Amman`,
      result: result,
    });
  });
};

const getCountIrbid = (req, res) => {
  const query = `SELECT  COUNT(hall_name) AS "Address" FROM Halls   WHERE  Halls.is_deleted=0 && Halls.hall_address='Irbid'`;

  connection.query(query, async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(404).json({
        success: false,
        message: `No Halls yet`,
      });
    }

    res.status(200).json({
      success: true,
      message: `All Halls In Irbid`,
      result: result,
    });
  });
};

module.exports = { getCountAmman, getCountIrbid, getCountAllHalls };
