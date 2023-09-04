const express = require('express');
const dotenv =require("dotenv")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
dotenv.config({})
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(`${process.env.MONGODB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define mongoose models for Employee and Department
// ...

// Define routes for signup, login, and department CRUD operations
// ...


// Configure routes in server.js
const employeeRoutes = require('./controller/auth');
const departmentRoutes = require('./controller/department');
const verifyToken = require('./verifyToken/verifiy.token');

app.use('/employee', employeeRoutes);
app.use('/manager', verifyToken, departmentRoutes); // Protect manager routes with authentication
 // Protect manager routes with authentication

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
