const state = require("../models/state");

const updatePumpStatus = async (status) => {
  const result = await state.findOneAndUpdate(
    {},
    { PumpStatus: status },
    { new: true }
  );
  return result;
};

const updateLightStatus = async (status) => {
  const result = await state.findOneAndUpdate(
    {},
    { LightStatus: status },
    { new: true }
  );
  return result;
};

const updatePumpActive = async () => {
  // toggle pump active
  const currentState = await state.findOne();
  const result = await state.findOneAndUpdate(
    {},
    { PumpActive: !currentState.PumpActive },
    { new: true }
  );
  return result;
};

const updateLightActive = async (status) => {
  // toggle light active
  const currentState = await state.findOne();
  const result = await state.findOneAndUpdate(
    {},
    { LightActive: !currentState.LightActive },
    { new: true }
  );
  return result;
};

const getState = async (type) => {
  const result = await state.findOne();
  // if not found, create new state
  if (!result) {
    const newState = new state({
      PumpActive: false,
      LightActive: false,
      PumpStatus: false,
      LightStatus: false,
      timestamp: new Date(),
    });
    await newState.save();
    return newState;
  }
  return result;
};

exports.getStateController = async (req, res) => {
  try {
    const type = req.query?.type;
    const result = await getState();
    if (type === "PumpActive" || type === "LightActive") {
      res.status(200).send(result[type]);
    }
    res.status(200).json({
      message: "Get state successfully",
      data: result,
    });
  } catch (error) {
    console.log("getStateController error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getPumpActiveController = async (req, res) => {
  try {
    const result = await getState();
    res.status(200).send(result.PumpActive);
  } catch (error) {
    console.log("getPumpActiveController error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getLightActiveController = async (req, res) => {
  try {
    const result = await getState();
    res.status(200).send(result.LightActive);
  } catch (error) {
    console.log("getLightActiveController error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updatePumpStatusController = async (req, res) => {
  const { status } = req.query;
  try {
    const result = await updatePumpStatus(status);
    res.status(200).json({
      message: "Update pump status successfully",
      data: result,
    });
  } catch (error) {
    console.log("updatePumpStatusController error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updateLightStatusController = async (req, res) => {
  const { status } = req.query;
  try {
    const result = await updateLightStatus(status);
    res.status(200).json({
      message: "Update light status successfully",
      data: result,
    });
  } catch (error) {
    console.log("updateLightStatusController error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updatePumpActiveController = async (req, res) => {
  const { status } = req.query;
  try {
    const result = await updatePumpActive(status);
    res.status(200).json({
      message: "Update pump active successfully",
      data: result,
    });
  } catch (error) {
    console.log("updatePumpActiveController error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updateLightActiveController = async (req, res) => {
  const { status } = req.query;
  try {
    const result = await updateLightActive(status);
    res.status(200).json({
      message: "Update light active successfully",
      data: result,
    });
  } catch (error) {
    console.log("updateLightActiveController error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
