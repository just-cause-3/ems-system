require('dotenv').config();
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

// Initialize mongoose-auto-increment
const mongoUri = process.env.MONGODB_URI || process.env.DATABASEURL || 'mongodb://localhost:27017/ems';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
autoIncrement.initialize(mongoose.connection);

const config = {
  mongoUri: mongoUri,
  jwtKey: process.env.JWTKEY || process.env.JWT_SECRET || 'change-this-dev-key'
};

module.exports = config;


