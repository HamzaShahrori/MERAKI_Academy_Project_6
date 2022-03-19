const connection = require("../database/db");

const createNewHall = (req, res) => {
  const {
    hall_image,
    hall_name,
    video,
    hall_description,
    hall_address,
    price,
  } = req.body;
  const query = `INSERT INTO Halls (hall_image, hall_name,video, hall_description,hall_address,price,user_id) VALUES (?,?,?,?,?,?,?) `;
  const user_id = [req.params.user_id];

  const data = [
    hall_image,
    hall_name,
    video,
    hall_description,
    hall_address,
    price,
    user_id,
  ];

  connection.query(query, data, (err, result) => {
    if (err) {
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
const getHallByUserId = (req, res) => {
  const data = req.params.user_id;
  const query = `SELECT halls.* FROM  users LEFT JOIN halls  ON  halls.user_id= ${data} WHERE halls.is_deleted=0 
  AND users.id = ${data} `;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(200).json({
        success: false,
        message: `No Hall Yet`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `All halls`,
      result: result,
    });
  });
};
const getAllHalls = (req, res) => {
  const limit = 4;
  const page = req.query.page;
  const offset = (page - 1) * limit;

  const query = `SELECT * FROM Halls WHERE Halls.is_deleted=0 limit ${limit} OFFSET ${offset}`;

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

const updateThePriceAfterDiscount = (req, res) => {
  const { discount } = req.body;

  const id = [req.body.id];
  const query = `SELECT * FROM Halls  WHERE id=? and is_deleted=0`;
  connection.query(query, id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    } else if (!result[0]) {
      return res.status(200).json({
        success: false,
        message: `No Halls at id ${id}`,
      });
    } else if (result[0] && discount > 1) {
      let price = result[0].price - result[0].price * (discount / 100);
      let PriceBeforeDiscount = result[0].price;

      const query = `UPDATE Halls SET price=?,discount=?,PriceBeforeDiscount=? WHERE id=?;`;
      const data = [price, discount, PriceBeforeDiscount, id];
      connection.query(query, data, (err, results) => {
        if (err) {
          return res.status(500).json({
            success: false,
            massage: `Server error`,
            err: err,
          });
        } else if (results.changedRows == 0) {
          res.status(404).json({
            success: false,
            massage: `The Hall: ${id} is not found`,
            err: err,
          });
        }

        res.status(201).json({
          success: true,
          massage: `Hall Price updated`,
          price: price,
          PriceBeforeDiscount: PriceBeforeDiscount,
        });
      });
    } else if (result[0] && discount == 1) {
      let price = result[0].PriceBeforeDiscount;
      let PriceBeforeDiscount = result[0].PriceBeforeDiscount;

      const query = `UPDATE Halls SET price=?,discount=?,PriceBeforeDiscount=? WHERE id=?;`;
      const data = [price, discount, PriceBeforeDiscount, id];
      connection.query(query, data, (err, results) => {
        if (err) {
          return res.status(500).json({
            success: false,
            massage: `Server error`,
            err: err,
          });
        } else if (results.changedRows == 0) {
          res.status(404).json({
            success: false,
            massage: `The Hall: ${id} is not found`,
            err: err,
          });
        }

        res.status(201).json({
          success: true,
          massage: `Hall Price updated`,
          price: price,
          PriceBeforeDiscount: PriceBeforeDiscount,
        });
      });
    }
  });
};

const getHallsByDiscount = (req, res) => {
  const limit = 4;
  const page = req.query.page;

  const offset = (page - 1) * limit;

  const query = `SELECT * FROM Halls WHERE Halls.discount>1 AND  Halls.is_deleted=0 ORDER BY discount DESC  limit ${limit} OFFSET ${offset} `;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(200).json({
        success: false,
        message: `NO Halls Yet `,
      });
    }

    res.status(200).json({
      success: true,
      message: `all Halls by discount`,
      result: result,
    });
  });
};

const createRating = (req, res) => {
  const { hall_rating } = req.body;

  const user_id = req.token.userId;
  const halls_id = req.params.halls_id;

  const query = `INSERT INTO Rating (hall_rating, user_id, halls_id) VALUES(?,?,?)`;

  const data = [hall_rating, user_id, halls_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    res.status(200).json({
      success: true,
      message: `hall by rating`,
      result: result,
    });
  });
};

const getHallByRating = (req, res) => {
  const halls_id = req.params.halls_id;

  const query = `SELECT AVG(hall_rating) AS AverageRating FROM Rating WHERE halls_id=${halls_id} `;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      res.status(200).json({
        success: false,
        message: `no rating yet`,
      });
    }

    res.status(200).json({
      success: true,
      message: `hall by rating`,
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
  updateThePriceAfterDiscount,
  getHallsByDiscount,
  getHallByUserId,
  createRating,
  getHallByRating,
};
