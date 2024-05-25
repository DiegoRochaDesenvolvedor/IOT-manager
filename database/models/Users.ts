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


export default mongoose.model('user', userSchema);