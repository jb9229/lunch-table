const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {type: Number, default: Date.now},
});

module.exports = EmployeeSchema = mongoose.model('employee', employeeSchema);