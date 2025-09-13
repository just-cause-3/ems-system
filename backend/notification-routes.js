const express = require('express');
const router = express.Router();
const Notification = require('./models/Notification');
const { verifyEmployee } = require('./middleware/auth');

// Get user's notifications
router.get("/api/notifications", verifyEmployee, async (req, res) => {
  console.log("Fetching notifications for employee ID:", req.employee._id);
  
  try {
    const notifications = await Notification.find({ recipientId: req.employee._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .exec();
    
    console.log(`Found ${notifications.length} notifications for employee`);
    res.json({
      success: true,
      count: notifications.length,
      notifications: notifications
    });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({
      error: "Failed to fetch notifications",
      details: err.message
    });
  }
});

// Mark notification as read
router.put("/api/notifications/:id/read", verifyEmployee, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipientId: req.employee._id },
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).send("Notification not found");
    }
    res.send(notification);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating notification");
  }
});

// Mark all notifications as read
router.put("/api/notifications/read-all", verifyEmployee, async (req, res) => {
  try {
    await Notification.updateMany(
      { recipientId: req.employee._id, read: false },
      { read: true }
    );
    res.send({ message: "All notifications marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating notifications");
  }
});

// Create notification utility function
const createNotification = async (recipientId, title, message, type, relatedId = null, onModel = null) => {
  try {
    const notification = new Notification({
      recipientId,
      title,
      message,
      type,
      relatedId,
      onModel
    });
    await notification.save();
    return notification;
  } catch (err) {
    console.error('Error creating notification:', err);
    return null;
  }
};

module.exports = {
  router,
  createNotification
};
