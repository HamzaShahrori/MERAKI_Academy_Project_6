const express = require("express");

const {
  getCountAmman,
  getCountIrbid,
  getCountAllHalls,
  getCountRating,
} = require("../controllers/count");

const countRouter = express.Router();

countRouter.get("/amman", getCountAmman);
countRouter.get("/irbid", getCountIrbid);
countRouter.get("/all", getCountAllHalls);
countRouter.get("/ratingcount/:halls_id", getCountRating);

module.exports = countRouter;
