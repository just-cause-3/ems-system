const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    ref: 'Employee'
  },
  companyName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  currentlyWorking: {
    type: Boolean,
    default: false
  },
  responsibilities: [String],
  achievements: [String],
  location: String
}, {
  timestamps: true
});

module.exports = mongoose.model('WorkExperience', workExperienceSchema);
