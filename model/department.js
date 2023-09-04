// department.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName:{type:String, required:true} ,
  categoryName:{type:String, required:true},
  location:{type:String, required:true},
  salary: {type:Number, required:true},
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
});

module.exports = mongoose.model('Department', departmentSchema);
