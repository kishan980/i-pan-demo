// Authentication routes (employee.js)
const express = require('express');
const router = express.Router();
const Employee = require('../model/employe'); // Import the Employee model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, gender, hobbies, email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({
      firstName,
      lastName,
      gender,
      hobbies,
      email,
      password: hashedPassword,
    });
    await employee.save();
    res.status(201).json({ message: 'Employee signed up successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = jwt.sign({ email: employee.email, _id: employee._id }, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXP_TIME});
    const {password, ...other}=employee._doc;
    res.status(200).json({ data:other,token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
