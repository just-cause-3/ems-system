const mongoose = require('mongoose');

const familyInfoSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    ref: 'Employee'
  },
  name: {
    type: String,
    required: true
  },
  relationship: {
    type: String,
    required: true
  },
  dateOfBirth: Date,
  occupation: String,
  contactNo: String,
  address: String
}, {
  timestamps: true
});

module.exports = mongoose.model('FamilyInfo', familyInfoSchema);
