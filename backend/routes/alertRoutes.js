const express = require('express');
const router = express.Router();
const { createAlert, getAlerts } = require('../controllers/alertController');

// Create new alert
router.post('/', createAlert);

// Get all alerts
router.get('/', getAlerts);
// DELETE /api/alerts/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Alert.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    res.json({ message: 'Alert deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
