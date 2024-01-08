var express = require("express");
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

module.exports = router;
