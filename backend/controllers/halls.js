const connection = require("../database/db");

const createNewHall = (req, res) => {
  const { hall_image, hall_name, video, hall_description, hall_address } =
    req.body;
  const query = `INSERT INTO Halls (hall_image, hall_name,video, hall_description,hall_address) VALUES (?,?,?,?,?); `;

  const data = [hall_image, hall_name, video, hall_description, hall_address];

  connection.query(query, data, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    res.status(201).json({
      success: true,
      message: `The wedding hall has been added to the booking page`,
      result: result,
    });
  });
};

const getAllHalls = (req, res) => {
  const limit = 4;
  const page = req.query.page;
  const offset = (page - 1) * limit;

  const query = `SELECT * FROM Halls   WHERE Halls.is_deleted=0 limit ${limit} OFFSET ${offset}`;

  connection.query(query, async (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(200).json({
        success: false,
        message: `No Halls Yet`,
      });
    }

    res.status(200).json({
      success: true,
      message: `All wedding halls to book`,
      result: result,
    });
  });
};

const getHallById = (req, res) => {
  const query = `SELECT * FROM Halls  WHERE id=? and is_deleted=0`;

  const data = [req.params.id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(200).json({
        success: false,
        message: `No hall at id ${data}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `The hall with id ${data}`,
      result: result,
    });
  });
};

const updateHallById = (req, res) => {
  const query = `UPDATE Halls SET? WHERE id=?`;

  const data = [req.body, req.params.id];

  connection.query(query, data, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: `The Hall is not Found`,
      });
    }
    res.status(201).json({
      success: true,
      message: `The wedding hall information has been successfully updated `,
      results: result,
    });
  });
};

const deleteHallById = (req, res) => {
  const query = `UPDATE Halls SET is_deleted=1 WHERE id=?`;

  const data = [req.params.id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: `The Hall with ${data} not Found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Succeeded to delete Hall with id ${data}`,
    });
  });
};

const getHallsByAddress = (req, res) => {
  const limit = 4;
  const page = req.query.page;

  const offset = (page - 1) * limit;

  const data = [req.query.hall_address.toLowerCase()];

  const query = `SELECT * FROM Halls WHERE Halls.is_deleted=0 AND hall_address=? limit ${limit} OFFSET ${offset} `;

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(200).json({
        success: false,
        message: `NO Halls in this Address ==>${data} `,
      });
    }

    res.status(200).json({
      success: true,
      message: `all Halls by Address`,
      result: result,
    });
  });
};

module.exports = {
  createNewHall,
  getAllHalls,
  getHallById,
  updateHallById,
  deleteHallById,
  getHallsByAddress,
};
