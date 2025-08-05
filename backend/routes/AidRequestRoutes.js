const express = require('express');
const router = express.Router();
const AidRequest = require('../models/AidRequest');
const authenticate = require('../middleware/authMiddleware');

// Create Aid Request
router.post('/', authenticate, async (req, res) => {
  try {
    const newRequest = new AidRequest({
      ...req.body,
      userId: req.user.id,
    });
    await newRequest.save();
    res.status(201).json({ message: 'Aid request saved' });
  } catch (error) {
    console.error('Error saving aid request:', error);
    res.status(500).json({ error: 'Failed to save aid request' });
  }
});

// Get All Aid Requests (Admin)
router.get('/', async (req, res) => {
  try {
    const requests = await AidRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch aid requests' });
  }
});

// Get Logged-in User's Requests
router.get('/user', authenticate, async (req, res) => {
  try {
    const requests = await AidRequest.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user requests' });
  }
});
// DELETE a request by ID (only by owner)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const request = await AidRequest.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!request) {
      return res.status(404).json({ message: 'Request not found or unauthorized' });
    }
    res.json({ message: 'Request deleted successfully' });
  } catch (err) {
    console.error('Error deleting request:', err);
    res.status(500).json({ error: 'Failed to delete request' });
  }
});
// Accept & Assign request
router.patch('/:id/accept', async (req, res) => {
  try {
    const request = await AidRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'Accepted' },
      { new: true }
    );
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: 'Failed to accept request' });
  }
});
// PATCH /api/aidrequests/:id/assign
router.patch('/:id/assign', async (req, res) => {
  const { volunteerId } = req.body;
  try {
    const updated = await AidRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Assigned',
        assignedVolunteer: volunteerId,
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to assign volunteer' });
  }
});


module.exports = router;
