const express = require("express");
const { createNewBooking, getAllBooking } = require("../controllers/booking");
const bookingRouter = express.Router();

bookingRouter.post("/", createNewBooking);
bookingRouter.get("/all", getAllBooking);
module.exports = bookingRouter;
