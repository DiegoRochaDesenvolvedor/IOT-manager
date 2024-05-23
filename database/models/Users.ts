import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: {},
    required: true
  }
});


module.exports = mongoose.model('user', userSchema);