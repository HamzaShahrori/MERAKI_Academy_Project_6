const connection = require("../database/db");

const getCountAllHalls = (req, res) => {
  const query = `SELECT  COUNT(id) AS "Address" FROM Halls  WHERE   Halls.is_deleted=0  `;

  connection.query(query, async (err, result) => {
    if (err) {
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

//count users id who rate this hall
const getCountRating = (req, res) => {
  const halls_id = req.params.halls_id;

  const query = `SELECT COUNT(id) AS ratingCount FROM Rating WHERE Rating.halls_id=${halls_id} AND Rating.is_deleted=0`;

  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      res.status(200).json({
        success: false,
        message: `No Rating Yet`,
      });
    }

    if (result[0]) {
      res.status(200).json({
        success: true,
        message: `All Rating`,
        result: result,
      });
    }
  });
};

module.exports = {
  getCountAmman,
  getCountIrbid,
  getCountAllHalls,
  getCountRating,
};
