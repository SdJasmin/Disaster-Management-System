const mongoose = require('mongoose');

const AidRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  requestType: { type: String, required: true },
  category: { type: String, required: true },
  urgency: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Completed'],
    default: 'Pending',
  },
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    default: null,
  },
  deliveryStatus: {
    type: String,
    enum: ['Assigned', 'In Progress', 'Completed'],
    default: 'Assigned',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AidRequest', AidRequestSchema);
