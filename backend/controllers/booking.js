const connection = require("../database/db");
const createNewBooking = (req, res) => {
  const { reserver, booking_day, date_booking, booking_time, phone, Payment } =
    req.body;

  const halls_id = [req.params.halls_id];

  const query = `INSERT INTO booking (reserver,booking_day,date_booking,booking_time,phone,Payment,halls_id) VALUES (?,?,?,?,?,?,?)`;
  const data = [
    reserver,
    booking_day,
    date_booking,
    booking_time,
    phone,
    Payment,
    halls_id,
  ];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    return res.status(201).json({
      success: true,
      message: `Booking Created`,
      result: result,
    });
  });
};

const getAllBooking = (req, res) => {
  const data = [req.params.halls_id];

  const query = `SELECT booking.* FROM halls LEFT JOIN booking ON booking.halls_id = ${data} WHERE booking.is_deleted =0  AND halls.id=${data}`;

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
        message: `no booking yet`,
      });
    }
    return res.status(201).json({
      success: true,
      message: `All Booking`,
      result: result,
    });
  });
};
module.exports = { createNewBooking, getAllBooking };
