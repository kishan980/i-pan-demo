// Department CRUD routes (department.js)
const express = require('express');
const router = express.Router();
const Department = require('../model/department'); // Import the Department model
const Employee = require('../model/employe'); // Import the Employee model

// Create a new department
router.post('/departments', async (req, res) => {
  try {
    const { departmentName, categoryName, location, salary, employeeID } = req.body;
    const department = new Department({
      departmentName,
      categoryName,
      location,
      salary,
      employeeID,
    });
    await department.save();
    res.status(201).json({ message: 'Department created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement Read, Update, Delete routes for departments as needed
// ...


// Get departments with pagination
router.get('/departments', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter
    const limit = 5; // Set the number of items per page
    const skip = (page - 1) * limit;

    const departments = await Department.find()
      .skip(skip)
      .limit(limit);

    const totalDocuments = await Department.countDocuments();

    res.status(200).json({
      departments,
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const findById = await Department.findById({_id:req.params.id})
    res.status(201).json({ message: 'Department  get by id', data:findById});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deleteOneRecords = await Department.findByIdAndDelete({_id:req.params.id})
    res.status(201).json({ message: 'Department  delete one recoreds', data:deleteOneRecords});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const updateData = await Department.findByIdAndUpdate({_id:req.params.id},req.body)
    res.status(201).json({ message: 'Department  updated', data:updateData});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Retrieve employees in IT department with location starting with 'A'
router.get('/employees-in-it-with-location-a', async (req, res) => {
  try {
    const employees = await Employee.find({
      department: 'IT', // Replace with the actual department ID or name
      location: { $regex: /^A/i }, // ^A matches strings that start with 'A' (case-insensitive)
    });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Retrieve employees in the Sales department in descending order of names
router.get('/employees-in-sales', async (req, res) => {
  try {
    const employees = await Employee.find({ department: 'Sales' }) // Replace with the actual department ID or name
      .sort({ lastName: -1, firstName: -1 }) // Sort by lastName and firstName in descending order

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
