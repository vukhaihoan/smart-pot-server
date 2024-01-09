// sensor model
const mongoose = require("mongoose");
const { MODELS } = require("../constances");

const stateSchema = new mongoose.Schema({
  PumpActive: {
    type: Boolean,
    required: true,
    default: false,
  },
  LightActive: {
    type: Boolean,
    required: true,
    default: false,
  },
  PumpStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  LightStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const State = mongoose.model(MODELS.State, stateSchema);

module.exports = State;
