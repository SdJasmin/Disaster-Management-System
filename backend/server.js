const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import route files
const authRoutes = require('./routes/authRoutes');
const aidRequestRoutes = require('./routes/AidRequestRoutes');
const alertRoutes = require('./routes/alertRoutes');
const volunteerRoutes = require('./routes/volunteer'); // ✅ volunteer route
const volunteerAssignedRoutes = require('./routes/volunteerAssigned');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/aidrequests', aidRequestRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/volunteers', volunteerRoutes); // ✅
app.use('/api/volunteer', volunteerAssignedRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
