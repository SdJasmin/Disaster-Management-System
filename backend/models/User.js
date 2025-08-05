const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  gender: String,
  state: String,
  phone: String,
  role: { type: String, enum: ['citizen', 'volunteer', 'admin'], default: 'citizen' },
  resetToken: String,
  resetTokenExpire: Date
});

module.exports = mongoose.model('User', userSchema);
