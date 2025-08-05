const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const sendEmail = require('../utils/sendEmail');
 // ✅ add this if not present
 // ✅ import this

// Register new volunteer + send email
router.post('/', async (req, res) => {
  try {
    const newVolunteer = new Volunteer({ ...req.body });
    await newVolunteer.save();

    // ✅ Send confirmation email
    const subject = 'Volunteer Registration Confirmation';
    const text = `Hello ${req.body.name},

Thank you for registering as a volunteer with the Disaster Management Portal.

📌 Your application is currently under review. We’ll contact you shortly.

Regards,
Disaster Management Team`;

    await sendEmail(req.body.email, subject, text); // ✅ now email will be sent

    res.status(201).json(newVolunteer);
  } catch (err) {
    console.error('Backend Error:', err);
    res.status(400).json({ error: 'Failed to register volunteer' });
  }
});

// Get all volunteers
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch volunteers' });
  }
});


router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // ✅ If approved, send confirmation email
    if (status === 'approved') {
      const subject = 'Volunteer Application Approved ✅';
      const text = `Hello ${updated.name},

🎉 Congratulations! Your application to be a volunteer has been approved.

You can now start supporting aid requests via your dashboard.

Log in and check your tasks or alerts from the admin.

Thank you for being part of the community.

— Disaster Management Team`;

      await sendEmail(updated.email, subject, text);
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ error: 'Failed to update volunteer status' });
  }
});
const jwt = require('jsonwebtoken');
const AidRequest = require('../models/AidRequest');

// ✅ Get assigned aid requests for a logged-in volunteer
router.get('/assigned', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const volunteerId = decoded.id;

    const assignedRequests = await AidRequest.find({ assignedVolunteer: volunteerId });

    res.json(assignedRequests);
  } catch (err) {
    console.error('Failed to fetch assigned aid requests:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;