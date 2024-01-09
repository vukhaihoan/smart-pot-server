const { query, validationResult, oneOf } = require("express-validator");
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
    query("temperature")
      .exists()
      .withMessage("temperature is required")
      .bail()
      .custom((value) => {
        console.log("value temperature", typeof value);
        if (!isNumeric(value)) {
          throw new Error("temperature must be a number");
        }
        return true;
      }),

    query("humidity")
      .exists()
      .withMessage("humidity is required")
      .bail()
      .custom((value) => {
        if (!isNumeric(value)) {
          throw new Error("humidity must be a number");
        }
        return true;
      }),

    query("light")
      .exists()
      .withMessage("light is required")
      .bail()
      .custom((value) => {
        if (!isNumeric(value)) {
          throw new Error("light must be a number");
        }
        return true;
      }),
  ];
};

// example getSensor request :

const pumpStatusValidator = (req, res, next) => {
  return [
    query("status")
      .exists()
      .withMessage("status is required")
      .bail()
      .isBoolean()
      .withMessage("status must be a boolean"),
  ];
};

const lightStatusValidator = (req, res, next) => {
  return [
    query("status")
      .exists()
      .withMessage("status is required")
      .bail()
      .isBoolean()
      .withMessage("status must be a boolean"),
  ];
};

const pumpActiveValidator = (req, res, next) => {
  return [
    query("status")
      .exists()
      .withMessage("status is required")
      .bail()
      .isBoolean()
      .withMessage("status must be a boolean"),
  ];
};

const lightActiveValidator = (req, res, next) => {
  return [
    query("status")
      .exists()
      .withMessage("status is required")
      .bail()
      .isBoolean()
      .withMessage("status must be a boolean"),
  ];
};

const getStateValidatator = () => {
  return [
    //query type is String pumpActie or lightActive
    query("type").optional(),
  ];
};

module.exports = {
  validate,
  sensorInsertValidator,
  pumpStatusValidator,
  lightStatusValidator,
  pumpActiveValidator,
  lightActiveValidator,
};
