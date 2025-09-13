require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { mongoUri, jwtKey } = require('./config');
const { verifyEmployee } = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Route handlers
const { router: notificationRouter } = require('./notification-routes');
const leaveRoutes = require('./leave-routes');
const personalInfoRoutes = require('./personal-info-routes');
const educationRoutes = require('./education-routes');
const workExperienceRoutes = require('./work-experience-routes');
const authRoutes = require('./auth-routes');

// Auth routes should be mounted first
app.use(authRoutes);

// Protected routes
app.use(notificationRouter);
app.use(leaveRoutes);
app.use(personalInfoRoutes);
app.use(educationRoutes);
app.use(workExperienceRoutes);
app.use(require('./family-info-routes'));

// MongoDB setup
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(err => {
    console.error("Database connection failed:", err);
  });

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api`);
});
