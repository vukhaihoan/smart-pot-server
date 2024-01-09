const sensor = require("../models/sensor");

const insertSensor = async (sensorData) => {
  const newSensor = new sensor(sensorData);
  const result = await newSensor.save();
  return result;
};

exports.insertSensorController = async (req, res) => {
  const { temperature, humidity, light } = req.body;
  const currentTime = new Date();
  const sensorData = {
    temperature: temperature,
    humidity: humidity,
    light: light,
    timestamp: currentTime,
  };
  console.log("sensorData", sensorData);
  try {
    const result = await insertSensor(sensorData);
    res.status(200).json({
      message: "Insert sensor data successfully",
      data: result,
    });
  } catch (error) {
    console.log("insertSensorController error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getSensorController = async (req, res) => {
  const result = await sensor.find().sort({ timestamp: -1 });
  if (result) {
    res.status(200).json({
      message: "Get sensor data successfully",
      data: result,
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
