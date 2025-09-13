const express = require('express');
const router = express.Router();
const Joi = require('joi');
const LeaveApplication = require('./models/LeaveApplication');
const Employee = require('./models/Employee');
const { verifyEmployee } = require('./middleware/auth');

// Get employee's leave applications
router.get("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  console.log("Fetching leave applications for employee ID:", req.params.id);
  
  Employee.findById(req.params.id)
    .populate('leaveApplication')
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      if (err) {
        console.error("Database error while fetching leave applications:", err);
        return res.status(500).json({
          error: "Failed to fetch leave applications",
          details: err.message
        });
      }
      if (!employee) {
        console.log("Employee not found with ID:", req.params.id);
        return res.status(404).json({
          error: "Employee not found"
        });
      }
      console.log("Successfully fetched leave applications for employee:", employee.FirstName);
      res.json(employee);
    });
});

// Create new leave application
router.post("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  console.log("Received leave application request for employee ID:", req.params.id);
  console.log("Leave application data:", req.body);

  const LeaveApplicationValidation = Joi.object().keys({
    Leavetype: Joi.string().required(),
    FromDate: Joi.date().required(),
    ToDate: Joi.date().required(),
    Reasonforleave: Joi.string().required()
  });

  const { error } = LeaveApplicationValidation.validate(req.body);
  if (error) {
    console.error("Validation error for leave application:", error.details[0].message);
    return res.status(400).json({
      error: "Invalid leave application data",
      details: error.details[0].message
    });
  }

  Employee.findById(req.params.id, function (err, employee) {
    if (err) {
      console.error("Database error while processing leave application:", err);
      return res.status(500).json({
        error: "Failed to process leave application",
        details: err.message
      });
    }
    if (!employee) {
      console.log("Employee not found with ID:", req.params.id);
      return res.status(404).json({
        error: "Employee not found"
      });
    }

    console.log("Processing leave application for employee:", employee.FirstName);
    const leaveApplicationData = {
      Leavetype: req.body.Leavetype,
      FromDate: req.body.FromDate,
      ToDate: req.body.ToDate,
      Reasonforleave: req.body.Reasonforleave,
      Status: "Pending",
      employee: employee._id
    };

    console.log("Creating leave application with data:", leaveApplicationData);
    const newLeaveApplication = new LeaveApplication(leaveApplicationData);
    newLeaveApplication.save(function(err, leaveApplication) {
      if (err) {
        console.error("Error saving leave application:", err);
        return res.status(500).json({
          error: "Failed to save leave application",
          details: err.message
        });
      }
      
      employee.leaveApplication.push(leaveApplication);
      employee.save(function(err, savedEmployee) {
        if (err) {
          console.error("Error updating employee with leave application:", err);
          return res.status(500).json({
            error: "Failed to update employee record",
            details: err.message
          });
        }
        console.log("Successfully created leave application");
        res.json({
          success: true,
          leaveApplication: leaveApplication
        });
      });
    });
  });
});

module.exports = router;
