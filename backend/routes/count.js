const express = require("express");

const { getCountAmman,getCountIrbid,getCountAllHalls} = require("../controllers/count");


const countRouter = express.Router();


countRouter.get("/amman", getCountAmman);
countRouter.get("/irbid", getCountIrbid);
countRouter.get("/all", getCountAllHalls);



module.exports = countRouter;
