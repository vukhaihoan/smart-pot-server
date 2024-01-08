var express = require("express");
const { sensorInsertValidator, validate } = require("./validator");
const {
  insertSensorController,
  getSensorController,
} = require("../controllers/sensor");
var router = express.Router();

router.use(function timeLog(req, res, next) {
  const currentTime = new Date();
  console.log(
    currentTime.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }) +
      ": " +
      req.url
  );
  next();
});

router.get("/", function (req, res) {
  res.send({
    message: "Welcome to the API",
  });
});

router.post(
  "/sensor",
  sensorInsertValidator(),
  validate,
  insertSensorController
);

router.get("/sensor", validate, getSensorController);

module.exports = router;
