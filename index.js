require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const { MONGODB_CONNECTION_STRING } = require("./config");
require("./models");
async function connect() {
  await mongoose.connect(MONGODB_CONNECTION_STRING);
  console.log("connect mongodb success");
}
connect().catch((err) => {
  console.log("connect mongodb fail");
  console.log(err);
});

var cors = require("cors");
const app = express();
var https = require("https");
const httpServer = require("http").createServer(app);
var port = process.env.PORT || 8008;
var httpsPort = process.env.HTTPS_PORT || 443;

var options = {};

app.use(cors());
app.use(express.json());

var api = require("./routers");
app.use("/", api);

httpServer.listen(port, () => {
  console.log(`listening on ${port}`);
});
https.createServer(options, app).listen(httpsPort, () => {
  console.log(`https listening on ${httpsPort}`);
});

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
