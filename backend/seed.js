require('dotenv').config();
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const bcrypt = require('bcryptjs');
const { mongoUri } = require('./config');

// Import all required models
const Employee = require('./models/Employee');
const Education = require('./models/Education');
const WorkExperience = require('./models/WorkExperience');
const FamilyInfo = require('./models/FamilyInfo');

async function run() {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    autoIncrement.initialize(mongoose.connection);

    const users = [
      { 
        FirstName: 'Admin',
        MiddleName: '',
        LastName: 'User',
        Email: 'admin@gmail.com',
        Password: 'admin',
        Account: 1,
        Gender: 'Male',
        DOB: new Date('1990-01-01'),
        DateOfJoining: new Date('2020-01-01'),
        EmployeeCode: 'ADMIN001',
        BloodGroup: 'O+',
        EmergencyContactNo: '1234567890',
        ContactNo: '9876543210',
        PANcardNo: 'ABCDE1234F'
      },
      { 
        FirstName: 'HR',
        MiddleName: '',
        LastName: 'Manager',
        Email: 'hr@gmail.com',
        Password: 'hr',
        Account: 2,
        Gender: 'Female',
        DOB: new Date('1992-02-15'),
        DateOfJoining: new Date('2020-02-01'),
        EmployeeCode: 'HR001',
        BloodGroup: 'B+',
        EmergencyContactNo: '2345678901',
        ContactNo: '8765432109',
        PANcardNo: 'BCDEF2345G'
      },
      { 
        FirstName: 'John',
        MiddleName: 'M',
        LastName: 'Doe',
        Email: 'emp@gmail.com',
        Password: 'emp',
        Account: 3,
        Gender: 'Male',
        DOB: new Date('1995-05-20'),
        DateOfJoining: new Date('2021-03-15'),
        EmployeeCode: 'EMP001',
        BloodGroup: 'A+',
        EmergencyContactNo: '3456789012',
        ContactNo: '7654321098',
        PANcardNo: 'CDEFG3456H',
        Address: '123 Main St, City',
        City: 'Bangalore',
        Country: 'India',
        ZipCode: '560001'
      },
      { 
        FirstName: 'Demo',
        MiddleName: 'User',
        LastName: 'Account',
        Email: 'hire-me@anshumat.org',
        Password: 'HireMe@2025!',
        Account: 3,
        Gender: 'Other',
        DOB: new Date('1993-08-25'),
        DateOfJoining: new Date('2021-01-10'),
        EmployeeCode: 'EMP002',
        BloodGroup: 'AB+',
        EmergencyContactNo: '4567890123',
        ContactNo: '6543210987',
        PANcardNo: 'DEFGH4567I',
        Address: '456 Park Ave, Town',
        City: 'Mumbai',
        Country: 'India',
        ZipCode: '400001'
      }
    ];

    // Clear existing data
    await Promise.all([
      Employee.deleteMany({}),
      Education.deleteMany({}),
      WorkExperience.deleteMany({}),
      FamilyInfo.deleteMany({})
    ]);
    console.log('Cleared existing data');

    for (const u of users) {
      const hashed = bcrypt.hashSync(u.Password, 10);
      const employee = await Employee.create({
        ...u,
        Password: hashed
      });
      console.log(`Created employee: ${u.Email}`);

      // Only add detailed info for regular employees (Account === 3)
      if (u.Account === 3) {
        // Add education records
        await Education.create([
          {
            employeeId: employee._id,
            schoolName: 'University of Technology',
            degree: 'Bachelor of Technology',
            field: 'Computer Science',
            startDate: new Date('2013-08-01'),
            endDate: new Date('2017-05-30'),
            grade: '3.8 GPA',
            description: 'Major in Software Engineering'
          },
          {
            employeeId: employee._id,
            schoolName: 'Management Institute',
            degree: 'Master of Business Administration',
            field: 'Technology Management',
            startDate: new Date('2017-08-01'),
            endDate: new Date('2019-05-30'),
            grade: '3.9 GPA',
            description: 'Focus on IT Management'
          }
        ]);
        console.log(`Added education records for ${u.Email}`);

        // Add work experience
        await WorkExperience.create([
          {
            employeeId: employee._id,
            companyName: 'Tech Solutions Inc',
            position: 'Software Engineer',
            startDate: new Date('2017-06-01'),
            endDate: new Date('2019-12-31'),
            currentlyWorking: false,
            responsibilities: [
              'Developed web applications using React',
              'Implemented RESTful APIs',
              'Led a team of 3 developers'
            ],
            location: 'Bangalore, India'
          },
          {
            employeeId: employee._id,
            companyName: 'Innovation Systems',
            position: 'Senior Developer',
            startDate: new Date('2020-01-01'),
            endDate: new Date('2021-02-28'),
            currentlyWorking: false,
            responsibilities: [
              'Architected cloud solutions',
              'Managed development team',
              'Implemented CI/CD pipelines'
            ],
            location: 'Mumbai, India'
          }
        ]);
        console.log(`Added work experience for ${u.Email}`);

        // Add family info
        await FamilyInfo.create([
          {
            employeeId: employee._id,
            name: 'Sarah Doe',
            relationship: 'Spouse',
            dateOfBirth: new Date('1996-03-15'),
            occupation: 'Doctor',
            contactNo: '5554443333',
            address: employee.Address
          },
          {
            employeeId: employee._id,
            name: 'Mike Doe',
            relationship: 'Son',
            dateOfBirth: new Date('2015-07-20'),
            occupation: 'Student',
            contactNo: '5554443334',
            address: employee.Address
          }
        ]);
        console.log(`Added family info for ${u.Email}`);
      }
    }

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (e) {
    console.error('Error seeding database:', e);
    process.exit(1);
  }
}

run();


