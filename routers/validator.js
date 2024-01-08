const {
  param,
  query,
  validationResult,
  oneOf,
  body,
} = require("express-validator");
const { isString, isInteger } = require("lodash");

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({
    errors: errors.array(),
  });
};

const sensorInsertValidator = (req, res, next) => {
  return [
    body("temperature")
      .exists()
      .withMessage("temperature is required")
      .bail()
      // .custom((value) => {
      //   console.log("value temperature", typeof value);
      //   if (!isNumeric(value)) {
      //     throw new Error("temperature must be a number");
      //   }
      //   return true;
      // }),
      .isInt(),
    body("humidity")
      .exists()
      .withMessage("humidity is required")
      .bail()
      // .custom((value) => {
      //   if (!isNumeric(value)) {
      //     throw new Error("humidity must be a number");
      //   }
      //   return true;
      // }),
      .isInt(),
    body("light")
      .exists()
      .withMessage("light is required")
      .bail()
      // .custom((value) => {
      //   if (!isNumeric(value)) {
      //     throw new Error("light must be a number");
      //   }
      //   return true;
      // }),
      .isInt(),
  ];
};

module.exports = {
  validate,
  sensorInsertValidator,
};
