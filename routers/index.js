var express = require("express");
const {
  sensorInsertValidator,
  validate,
  pumpStatusValidator,
  lightStatusValidator,
  pumpActiveValidator,
  lightActiveValidator,
} = require("./validator");
const {
  insertSensorController,
  getSensorController,
} = require("../controllers/sensor");
const {
  getStateController,
  updatePumpStatusController,
  updateLightStatusController,
  updatePumpActiveController,
  updateLightActiveController,
  getPumpActiveController,
  getLightActiveController,
} = require("../controllers/state");

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

router.get("/state", validate, getStateController);

router.post(
  "/state/pump/status",
  pumpStatusValidator(),
  validate,
  updatePumpStatusController
);

router.post(
  "/state/light/status",
  lightStatusValidator(),
  validate,
  updateLightStatusController
);

router.get("/state/pump/active", validate, getPumpActiveController);
router.get("/state/light/active", validate, getLightActiveController);

router.post(
  "/state/pump/active",
  // pumpActiveValidator(),
  validate,
  updatePumpActiveController
);

router.post(
  "/state/light/active",
  // lightActiveValidator(),
  validate,
  updateLightActiveController
);

module.exports = router;
