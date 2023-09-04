// employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName:  {
    type: String,
    required: true,
  },
  lastName:  {
    type: String,
    required: true,
  },
  gender:  {
    type: String,
    required: true,
  },
  hobbies: [String],
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
});

module.exports = mongoose.model('Employee', employeeSchema);

