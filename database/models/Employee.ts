import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  departament: {
    type: String,
    required: true,
  },
  adimission: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);