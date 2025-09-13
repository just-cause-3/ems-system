const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const expenseSchema = new mongoose.Schema({
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee',
    required: true 
  },
  expenseType: { 
    type: String, 
    required: true,
    enum: ['Travel', 'Meal', 'Supply', 'Equipment', 'Other']
  },
  amount: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true,
    default: Date.now 
  },
  description: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    required: true,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  receiptUrl: { 
    type: String 
  },
  approvedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee' 
  },
  approvalDate: { 
    type: Date 
  },
  comments: { 
    type: String 
  }
});

expenseSchema.plugin(autoIncrement.plugin, {
  model: 'Expense',
  field: 'ExpenseID'
});

module.exports = mongoose.model('Expense', expenseSchema);
