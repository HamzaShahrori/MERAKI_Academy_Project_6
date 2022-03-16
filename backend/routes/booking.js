const express = require("express");
const { createNewBooking, getAllBooking } = require("../controllers/booking");
const bookingRouter = express.Router();

bookingRouter.post("/:halls_id", createNewBooking);
bookingRouter.get("/all/:halls_id", getAllBooking);
module.exports = bookingRouter;
