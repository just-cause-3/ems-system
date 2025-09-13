require('dotenv').config();
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const bcrypt = require('bcryptjs');
const { mongoUri } = require('./config');

async function run() {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    autoIncrement.initialize(mongoose.connection);

    // Minimal Employee model import or inline to avoid circular deps
    const employeeSchema = new mongoose.Schema({
      FirstName: String,
      MiddleName: String,
      LastName: String,
      Email: { type: String, unique: true },
      Password: String,
      Account: Number
    });
    employeeSchema.plugin(autoIncrement.plugin, { model: 'Employee', field: 'EmployeeID' });
    const Employee = mongoose.model('Employee', employeeSchema);

    const users = [
      { FirstName: 'Admin', MiddleName: '', LastName: 'User', Email: 'admin@gmail.com', Password: 'admin', Account: 1 },
      { FirstName: 'HR', MiddleName: '', LastName: 'User', Email: 'hr@gmail.com', Password: 'hr', Account: 2 },
      { FirstName: 'Emp', MiddleName: '', LastName: 'User', Email: 'emp@gmail.com', Password: 'emp', Account: 3 },
      { FirstName: 'Hire', MiddleName: '', LastName: 'Me', Email: 'hire-me@anshumat.org', Password: 'HireMe@2025!', Account: 3 }
    ];

    for (const u of users) {
      const hashed = bcrypt.hashSync(u.Password, 10);
      await Employee.updateOne(
        { Email: u.Email },
        { $setOnInsert: { ...u, Password: hashed } },
        { upsert: true }
      );
      console.log(`Seeded user: ${u.Email}`);
    }
    console.log('Seeding complete.');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

run();


