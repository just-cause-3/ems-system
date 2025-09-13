const express = require('express');
const router = express.Router();
const Education = require('./models/Education');
const { verifyEmployee } = require('./middleware/auth');

// Get employee education records
router.get("/api/education/:id", verifyEmployee, async (req, res) => {
  try {
    const education = await Education.find({ employeeId: req.params.id });
    res.json(education);
  } catch (err) {
    console.error("Error fetching education records:", err);
    res.status(500).json({ error: "Failed to fetch education records" });
  }
});

// Add education record
router.post("/api/education/:id", verifyEmployee, async (req, res) => {
  try {
    const education = new Education({
      ...req.body,
      employeeId: req.params.id
    });
    await education.save();
    res.status(201).json(education);
  } catch (err) {
    console.error("Error adding education record:", err);
    res.status(500).json({ error: "Failed to add education record" });
  }
});

// Update education record
router.put("/api/education/:id/:educationId", verifyEmployee, async (req, res) => {
  try {
    const education = await Education.findOneAndUpdate(
      { _id: req.params.educationId, employeeId: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!education) {
      return res.status(404).json({ error: "Education record not found" });
    }
    res.json(education);
  } catch (err) {
    console.error("Error updating education record:", err);
    res.status(500).json({ error: "Failed to update education record" });
  }
});

// Delete education record
router.delete("/api/education/:id/:educationId", verifyEmployee, async (req, res) => {
  try {
    const education = await Education.findOneAndDelete({
      _id: req.params.educationId,
      employeeId: req.params.id
    });
    if (!education) {
      return res.status(404).json({ error: "Education record not found" });
    }
    res.json({ message: "Education record deleted" });
  } catch (err) {
    console.error("Error deleting education record:", err);
    res.status(500).json({ error: "Failed to delete education record" });
  }
});

module.exports = router;
