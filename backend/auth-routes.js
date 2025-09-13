const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('./config');
const Employee = require('./models/Employee');
const Joi = require('joi');

// Login validation schema
const loginSchema = Joi.object({
  Email: Joi.string().email().required(),
  Password: Joi.string().required()
});

// Login route
router.post("/api/login", async (req, res) => {
  // Validate request body
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: "Validation error",
      details: error.details[0].message
    });
  }

  try {
    // Find employee by email
    const employee = await Employee.findOne({ Email: req.body.Email })
      .select('Password FirstName LastName Email Account EmployeeID')
      .exec();

    if (!employee) {
      return res.status(401).json({
        error: "Authentication failed",
        details: "Email or password is incorrect"
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(req.body.Password, employee.Password);
    if (!validPassword) {
      return res.status(401).json({
        error: "Authentication failed",
        details: "Email or password is incorrect"
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        _id: employee._id,
        Email: employee.Email,
        FirstName: employee.FirstName,
        LastName: employee.LastName,
        Account: employee.Account,
        EmployeeID: employee.EmployeeID
      },
      jwtKey,
      { expiresIn: '24h' }
    );

    // Send response
    res.json({
      message: "Login successful",
      token: token,
      type: "Bearer",
      _id: employee._id,
      Email: employee.Email,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Account: employee.Account,
      EmployeeID: employee.EmployeeID
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      error: "Login failed",
      details: "Internal server error"
    });
  }
});

// Register route (for testing/development)
router.post("/api/register", async (req, res) => {
  try {
    // Check if email already exists
    const existingEmployee = await Employee.findOne({ Email: req.body.Email });
    if (existingEmployee) {
      return res.status(400).json({
        error: "Registration failed",
        details: "Email already exists"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);

    // Create new employee
    const employee = new Employee({
      ...req.body,
      Password: hashedPassword,
      Account: 3 // Default to regular employee
    });

    await employee.save();

    res.status(201).json({
      message: "Registration successful",
      employeeId: employee._id
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      error: "Registration failed",
      details: err.message
    });
  }
});

module.exports = router;
