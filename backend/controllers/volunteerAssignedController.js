// controllers/volunteerAssignedController.js
const AidRequest = require('../models/AidRequest');
const Volunteer = require('../models/Volunteer');

exports.assignRequestToVolunteer = async (req, res) => {
  try {
    const { requestId, volunteerEmail } = req.body;

    // Find the volunteer
    const volunteer = await Volunteer.findOne({ email: volunteerEmail });
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });

    // Update the AidRequest with volunteer assignment
    const updatedRequest = await AidRequest.findByIdAndUpdate(
      requestId,
      {
        assignedVolunteer: volunteerEmail,
        status: 'Assigned',
      },
      { new: true }
    );

    res.status(200).json({ message: 'Request assigned to volunteer', updatedRequest });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
