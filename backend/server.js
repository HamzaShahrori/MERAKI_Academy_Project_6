const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");
const connection = require("./database/db");

app.use(cors());
app.use(express.json());
const hallsRouter = require("./routes/halls");
app.use("/halls", hallsRouter);

const countRouter = require("./routes/count");
app.use("/count", countRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);
const bookingRouter = require("./routes/booking");
app.use("/booking", bookingRouter);

const roleRouter = require("./routes/roles");
app.use("/roles", roleRouter);

const userRouter = require("./routes/users");
app.use("/users", userRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
