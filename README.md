# Employee Management System (EMS)

## Overview
Employee Management System is a comprehensive web application built with the MERN stack that enables organizations to efficiently manage their employee records, payroll, and HR processes.

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the project directory:
```bash
git clone https://github.com/your-username/ems-system.git
cd ems-system/app
```

2. Install dependencies for both backend and frontend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Running the Application

1. Start MongoDB service (if not running)

2. Start the backend server:
```bash
cd backend
npm start
# Server will start on http://localhost:4000
```

3. In a new terminal, start the frontend:
```bash
cd frontend
npm start
# Frontend will start on http://localhost:3000
```

## Key Features

- Employee Management System is a web application that enables users to create, store and manage Employee Records
- The application provides a comprehensive payroll system and leave application management
- Efficiently manage employees, company tasks, and projects
- Store and manage detailed employee information, department data, and organizational structure
- Role-based access control with three user types: Admin, HR, and Employee
- Real-time notifications for leave applications and updates
- Mobile-responsive design for access on any devicenagement System

Note: start with : npm start & install : npm install

-------------

Website: 
-------------

- Employee Management system is a web application that enables users to create,store and manage Employee Records
- The application also provides facilities of a payroll system and leave application
- It is a management system that helps to manage employees and also the company’s different task and project
- Employee management system can manage and store details of employees like employees personal info and also details of different department of the company and different branches of the organization

## System Architecture

### Technology Stack
- **Frontend**: React.js with modern React features and hooks
- **Backend**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API
- **UI Framework**: Custom CSS with responsive design

### User Roles and Access Levels

1. **Admin Access**
   - Full system access
   - Manage employee records
   - Configure company structure
   - Handle role assignments
   - Approve/reject leave applications
   - Generate reports

2. **HR Access**
   - View employee records
   - Process leave applications
   - Update employee information
   - Manage department data
   - Handle notifications

3. **Employee Access**
   - View/edit personal profile
   - Submit leave applications
   - Access payroll information
   - Update personal documents
   - View company notifications

## Core Modules

### 1. Authentication System
- Secure login with JWT
- Role-based access control
- Password encryption
- Session management

### 2. Employee Management
- Personal information management
- Document storage
- Skills and qualifications tracking
- Performance records

### 3. Leave Management
- Multiple leave types
- Leave balance tracking
- Application workflow
- Approval system

### 4. Dashboards
- Role-specific dashboards
- Real-time updates
- Analytics and reporting
- Notification center

### 5. Company Structure
- Department management
- Position hierarchy
- Role configuration
- Branch management

### 6. Security
- Data encryption
- Access control
- Audit logging
- Session management


![image10](https://user-images.githubusercontent.com/57451228/125170462-d8b12c80-e1cc-11eb-9df4-a2ced9688f60.png)
![image11](https://user-images.githubusercontent.com/57451228/125170463-d9e25980-e1cc-11eb-9af0-2ed0b5b83398.png)
![image12](https://user-images.githubusercontent.com/57451228/125170464-da7af000-e1cc-11eb-90d0-99bb67bb29f0.png)
![image13](https://user-images.githubusercontent.com/57451228/125170466-da7af000-e1cc-11eb-9045-45f3af205e6e.png)
![image14](https://user-images.githubusercontent.com/57451228/125170468-db138680-e1cc-11eb-9d80-dceeb1fc4518.png)
![image15](https://user-images.githubusercontent.com/57451228/125170469-dbac1d00-e1cc-11eb-95f3-9c8703b0bd07.png)
![image16](https://user-images.githubusercontent.com/57451228/125170471-dbac1d00-e1cc-11eb-83b4-c089aa8289ea.png)
![image17](https://user-images.githubusercontent.com/57451228/125170474-dc44b380-e1cc-11eb-9214-68e6654a1dca.png)
![image18](https://user-images.githubusercontent.com/57451228/125170476-dc44b380-e1cc-11eb-8000-a257b7b69413.png)
![image19](https://user-images.githubusercontent.com/57451228/125170479-dcdd4a00-e1cc-11eb-8c09-cd8bb5767ab6.png)
![image20](https://user-images.githubusercontent.com/57451228/125170482-dd75e080-e1cc-11eb-9d63-f4a4669294e7.png)
![image1](https://user-images.githubusercontent.com/57451228/125170484-dd75e080-e1cc-11eb-83b2-fe0ea121194e.png)
![image2](https://user-images.githubusercontent.com/57451228/125170486-de0e7700-e1cc-11eb-9cae-b5b32200f6e4.png)
![image3](https://user-images.githubusercontent.com/57451228/125170487-de0e7700-e1cc-11eb-94fa-c836bba0075d.png)
![image4](https://user-images.githubusercontent.com/57451228/125170488-dea70d80-e1cc-11eb-80fd-5d08c7771f8b.png)
![image5](https://user-images.githubusercontent.com/57451228/125170489-df3fa400-e1cc-11eb-83e3-efecc4b6f7ab.png)
![image6](https://user-images.githubusercontent.com/57451228/125170490-df3fa400-e1cc-11eb-9e2d-50d8bf2f91dd.png)
![image7](https://user-images.githubusercontent.com/57451228/125170491-dfd83a80-e1cc-11eb-9878-b44a343122b7.png)
![image8](https://user-images.githubusercontent.com/57451228/125170492-dfd83a80-e1cc-11eb-8cd9-a93b87990c08.png)
![image9](https://user-images.githubusercontent.com/57451228/125170493-e070d100-e1cc-11eb-9ced-47520ef40e1b.png)

## API Documentation

### Authentication Endpoints
```
POST /api/login
POST /api/register
POST /api/logout
```

### Employee Endpoints
```
GET    /api/employees
POST   /api/employees
GET    /api/employees/:id
PUT    /api/employees/:id
DELETE /api/employees/:id
```

### Leave Management Endpoints
```
GET    /api/leave-applications
POST   /api/leave-applications
PUT    /api/leave-applications/:id
DELETE /api/leave-applications/:id
```

### Company Structure Endpoints
```
GET    /api/departments
POST   /api/departments
PUT    /api/departments/:id
DELETE /api/departments/:id
```

## Development Guidelines

### Setting Up Development Environment

1. Install required tools:
   - Node.js
   - MongoDB
   - Git
   - VS Code (recommended)

2. VS Code Extensions:
   - ESLint
   - Prettier
   - MongoDB for VS Code
   - React Developer Tools

### Code Style

- Follow Airbnb JavaScript Style Guide
- Use ESLint for code linting
- Use Prettier for code formatting
- Write meaningful commit messages

### Testing

Run tests using:
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Debugging

1. Backend:
   - Use `console.log()` for basic debugging
   - Use Chrome DevTools with `--inspect` flag
   - Monitor MongoDB queries

2. Frontend:
   - Use React Developer Tools
   - Check browser console
   - Use network tab for API calls

## Troubleshooting Common Issues

1. **MongoDB Connection Issues**
   - Check if MongoDB service is running
   - Verify connection string in `.env`
   - Check network connectivity

2. **Node.js Errors**
   - Clear `node_modules` and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **React Application Issues**
   - Clear browser cache
   - Check console for errors
   - Verify API endpoint configuration

## Support and Contact

For support, please email: support@example.com

## License

This project is licensed under the MIT License.

---
