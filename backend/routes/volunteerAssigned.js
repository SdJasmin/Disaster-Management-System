const express = require('express');
const router = express.Router();
const AidRequest = require('../models/AidRequest');
const Volunteer = require('../models/Volunteer');
const authMiddleware = require('../middleware/auth');

// ✅ Assign a request to a volunteer (Admin API)
router.post('/assign', async (req, res) => {
  try {
    const { requestId, volunteerId } = req.body;

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    const updatedRequest = await AidRequest.findByIdAndUpdate(
      requestId,
      {
        assignedVolunteer: volunteer._id,
        deliveryStatus: 'Assigned',
      },
      { new: true }
    );

    res.status(200).json({ message: 'Volunteer assigned successfully', updatedRequest });
  } catch (err) {
    console.error('Assignment error:', err);
    res.status(500).json({ error: 'Assignment failed' });
  }
});

// ✅ Volunteer: Get all assigned aid requests
router.get('/assigned', authMiddleware, async (req, res) => {
  try {
    const volunteerId = req.user.id;

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    const assignedRequests = await AidRequest.find({ assignedVolunteer: volunteerId });

    res.json({ volunteerName: volunteer.name, requests: assignedRequests });
  } catch (err) {
    console.error('Error fetching assigned requests:', err);
    res.status(500).json({ error: 'Failed to fetch assigned requests' });
  }
});

// ✅ Volunteer: Update delivery status
router.put('/update-status/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await AidRequest.findByIdAndUpdate(
      req.params.id,
      { deliveryStatus: status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error('Error updating delivery status:', err);
    res.status(500).json({ error: 'Failed to update delivery status' });
  }
});

module.exports = router;
