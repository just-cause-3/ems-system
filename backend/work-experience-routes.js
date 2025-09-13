const express = require('express');
const router = express.Router();
const WorkExperience = require('./models/WorkExperience');
const { verifyEmployee } = require('./middleware/auth');

// Get employee work experience records
router.get("/api/work-experience/:id", verifyEmployee, async (req, res) => {
  try {
    const workExperience = await WorkExperience.find({ employeeId: req.params.id });
    res.json(workExperience);
  } catch (err) {
    console.error("Error fetching work experience records:", err);
    res.status(500).json({ error: "Failed to fetch work experience records" });
  }
});

// Add work experience record
router.post("/api/work-experience/:id", verifyEmployee, async (req, res) => {
  try {
    const workExperience = new WorkExperience({
      ...req.body,
      employeeId: req.params.id
    });
    await workExperience.save();
    res.status(201).json(workExperience);
  } catch (err) {
    console.error("Error adding work experience record:", err);
    res.status(500).json({ error: "Failed to add work experience record" });
  }
});

// Update work experience record
router.put("/api/work-experience/:id/:experienceId", verifyEmployee, async (req, res) => {
  try {
    const workExperience = await WorkExperience.findOneAndUpdate(
      { _id: req.params.experienceId, employeeId: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!workExperience) {
      return res.status(404).json({ error: "Work experience record not found" });
    }
    res.json(workExperience);
  } catch (err) {
    console.error("Error updating work experience record:", err);
    res.status(500).json({ error: "Failed to update work experience record" });
  }
});

// Delete work experience record
router.delete("/api/work-experience/:id/:experienceId", verifyEmployee, async (req, res) => {
  try {
    const workExperience = await WorkExperience.findOneAndDelete({
      _id: req.params.experienceId,
      employeeId: req.params.id
    });
    if (!workExperience) {
      return res.status(404).json({ error: "Work experience record not found" });
    }
    res.json({ message: "Work experience record deleted" });
  } catch (err) {
    console.error("Error deleting work experience record:", err);
    res.status(500).json({ error: "Failed to delete work experience record" });
  }
});

module.exports = router;
