require('dotenv').config();

const config = {
  mongoUri: process.env.DATABASEURL || process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/ems',
  jwtKey: process.env.JWTKEY || 'change-this-dev-key'
};

module.exports = config;


