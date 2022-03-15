const express = require("express");

const {
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
} = require("../controllers/halls");

const authentication = require("../middleware/authentication");

const hallsRouter = express.Router();

hallsRouter.post("/:user_id", createNewHall);
hallsRouter.get("/page", getAllHalls);
hallsRouter.get("/:id", getHallById);
hallsRouter.put("/:id", updateHallById);
hallsRouter.delete("/:id", deleteHallById);
hallsRouter.get("/page/hall_address", getHallsByAddress);
hallsRouter.put("/", updateThePriceAfterDiscount);
hallsRouter.get("/page/Home", getHallsByDiscount);
hallsRouter.get("/add/:user_id", getHallByUserId);
hallsRouter.post("/rating/:halls_id", authentication, createRating);
hallsRouter.get("/rating/:halls_id", getHallByRating);

module.exports = hallsRouter;
