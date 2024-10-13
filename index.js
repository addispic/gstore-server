require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// socket
const { server, app } = require("./api/socket/socketIo");
// db connection handler
const dbConnectionHandler = require("./api/db/dbConnection");

// port
const PORT = process.env.PORT || 5000;

// settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// routes
app.use("/api", require("./api/routes/usersRoute"));

// server
server.listen(PORT, async () => {
  await dbConnectionHandler();
  console.log("listening");
});
