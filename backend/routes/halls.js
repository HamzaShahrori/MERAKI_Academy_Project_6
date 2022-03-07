const express = require("express");

const { createNewHall,getAllHalls,getHallById,updateHallById,deleteHallById,getHallsByAddress } = require("../controllers/halls");

const hallsRouter = express.Router();

hallsRouter.post("/", createNewHall);
hallsRouter.get("/page", getAllHalls);
hallsRouter.get("/:id", getHallById);
hallsRouter.put("/:id", updateHallById);
hallsRouter.delete("/:id", deleteHallById);
hallsRouter.get("/page/hall_address", getHallsByAddress);





module.exports = hallsRouter;