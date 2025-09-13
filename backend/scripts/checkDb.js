require('dotenv').config();
const mongoose = require('mongoose');
const { mongoUri } = require('../config');

async function main() {
  console.log('Checking MongoDB connection...');
  console.log('Using URL:', mongoUri.replace(/:\w+@/, ':***@')); // mask password if present
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ MongoDB connection successful');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ MongoDB connection failed');
    console.error(err && err.message ? err.message : err);
    console.error('\nTips:');
    console.error('- Verify DATABASEURL/MONGODB_URI/MONGO_URL in backend/.env');
    console.error('- Ensure MongoDB is running and accessible from this machine');
    process.exit(1);
  }
}

main();


