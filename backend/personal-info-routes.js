const express = require('express');
const router = express.Router();
const Employee = require('./models/Employee');
const { verifyEmployee } = require('./middleware/auth');

// Get employee personal info
router.get("/api/personal-info/:id", verifyEmployee, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .select("FirstName LastName MiddleName Email DOB ContactNo EmergencyContactNo Gender BloodGroup Address City Country ZipCode");
    
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    console.error("Error fetching personal info:", err);
    res.status(500).json({ error: "Failed to fetch personal information" });
  }
});

// Update employee personal info
router.put("/api/personal-info/:id", verifyEmployee, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    console.error("Error updating personal info:", err);
    res.status(500).json({ error: "Failed to update personal information" });
  }
});

module.exports = router;
