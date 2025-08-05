const Alert = require('../models/Alert');

// POST /api/alerts - Create a new alert
const createAlert = async (req, res) => {
  try {
    const { title, message, region, timestamp } = req.body;
    const newAlert = new Alert({ title, message, region, timestamp });
    await newAlert.save();
    res.status(201).json({ message: 'Alert created successfully', alert: newAlert });
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ error: 'Server error while creating alert' });
  }
};

// GET /api/alerts - Get all alerts
const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 }); // Latest first
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Server error while fetching alerts' });
  }
};

module.exports = {
  createAlert,
  getAlerts
};
