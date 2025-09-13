const express = require('express');
const router = express.Router();
const Expense = require('./models/Expense');
const Joi = require('joi');
const { verifyHR, verifyEmployee } = require('./middleware/auth');

// Expense validation schema
const ExpenseValidation = Joi.object().keys({
  expenseType: Joi.string().valid('Travel', 'Meal', 'Supply', 'Equipment', 'Other').required(),
  amount: Joi.number().positive().required(),
  description: Joi.string().required(),
  receiptUrl: Joi.string().uri().optional(),
  comments: Joi.string().optional()
});

// Submit an expense
router.post("/", verifyEmployee, (req, res) => {
  // Validate request
  const { error } = Joi.validate(req.body, ExpenseValidation);
  if (error) return res.status(400).send(error.details[0].message);

  // Create expense
  const expense = new Expense({
    employeeId: req.employee._id,
    expenseType: req.body.expenseType,
    amount: req.body.amount,
    description: req.body.description,
    receiptUrl: req.body.receiptUrl,
    comments: req.body.comments
  });

  expense.save((err, savedExpense) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error submitting expense");
    }
    res.status(201).send(savedExpense);
  });
});

// Get employee's own expenses
router.get("/", verifyEmployee, (req, res) => {
  Expense.find({ employeeId: req.employee._id })
    .sort({ date: -1 })
    .exec((err, expenses) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error fetching expenses");
      }
      res.send(expenses);
    });
});

// Get all expenses (for HR/Admin)
router.get("/all", verifyHR, (req, res) => {
  Expense.find()
    .populate('employeeId', 'FirstName MiddleName LastName Email')
    .populate('approvedBy', 'FirstName MiddleName LastName')
    .sort({ date: -1 })
    .exec((err, expenses) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error fetching expenses");
      }
      res.send(expenses);
    });
});

// Approve/Reject expense
router.put("/:id/status", verifyHR, async (req, res) => {
  if (!req.body.status || !['Approved', 'Rejected'].includes(req.body.status)) {
    return res.status(400).send("Invalid status");
  }

  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        approvedBy: req.employee._id,
        approvalDate: Date.now(),
        comments: req.body.comments
      },
      { new: true }
    )
      .populate('employeeId', 'FirstName MiddleName LastName Email')
      .populate('approvedBy', 'FirstName MiddleName LastName')
      .exec();

    if (!expense) {
      return res.status(404).send("Expense not found");
    }

    // Create notification for the employee
    const notificationType = req.body.status === 'Approved' ? 'expense_approved' : 'expense_rejected';
    const notificationTitle = `Expense ${req.body.status.toLowerCase()}`;
    const notificationMessage = `Your expense for $${expense.amount} has been ${req.body.status.toLowerCase()}${
      req.body.comments ? `: ${req.body.comments}` : ''
    }`;

    await createNotification(
      expense.employeeId._id,
      notificationTitle,
      notificationMessage,
      notificationType,
      expense._id,
      'Expense'
    );

    res.send(expense);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error updating expense status");
  }
});

module.exports = router;
