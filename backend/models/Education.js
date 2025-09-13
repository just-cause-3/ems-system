const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    ref: 'Employee'
  },
  schoolName: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  grade: String,
  description: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Education', educationSchema);
