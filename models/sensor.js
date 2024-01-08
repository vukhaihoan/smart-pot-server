// sensor model
const mongoose = require("mongoose");
const { MODELS } = require("../constances");

const sensorSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  light: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const Sensor = mongoose.model(MODELS.SENSOR, sensorSchema);

module.exports = Sensor;
