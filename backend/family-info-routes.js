const express = require('express');
const router = express.Router();
const FamilyInfo = require('./models/FamilyInfo');
const { verifyEmployee } = require('./middleware/auth');

// Get employee family info
router.get("/api/family-info/:id", verifyEmployee, async (req, res) => {
  try {
    const familyInfo = await FamilyInfo.find({ employeeId: req.params.id });
    res.json(familyInfo);
  } catch (err) {
    console.error("Error fetching family info:", err);
    res.status(500).json({ error: "Failed to fetch family information" });
  }
});

// Add family info
router.post("/api/family-info/:id", verifyEmployee, async (req, res) => {
  try {
    const familyInfo = new FamilyInfo({
      ...req.body,
      employeeId: req.params.id
    });
    await familyInfo.save();
    res.status(201).json(familyInfo);
  } catch (err) {
    console.error("Error adding family info:", err);
    res.status(500).json({ error: "Failed to add family information" });
  }
});

// Update family info
router.put("/api/family-info/:id/:familyInfoId", verifyEmployee, async (req, res) => {
  try {
    const familyInfo = await FamilyInfo.findOneAndUpdate(
      { _id: req.params.familyInfoId, employeeId: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!familyInfo) {
      return res.status(404).json({ error: "Family info record not found" });
    }
    res.json(familyInfo);
  } catch (err) {
    console.error("Error updating family info:", err);
    res.status(500).json({ error: "Failed to update family information" });
  }
});

// Delete family info
router.delete("/api/family-info/:id/:familyInfoId", verifyEmployee, async (req, res) => {
  try {
    const familyInfo = await FamilyInfo.findOneAndDelete({
      _id: req.params.familyInfoId,
      employeeId: req.params.id
    });
    if (!familyInfo) {
      return res.status(404).json({ error: "Family info record not found" });
    }
    res.json({ message: "Family info record deleted" });
  } catch (err) {
    console.error("Error deleting family info:", err);
    res.status(500).json({ error: "Failed to delete family information" });
  }
});

module.exports = router;
