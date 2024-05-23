import mongoose from 'mongoose';

const devicesSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  configuration: {
    type: {},
    required: true
  },
  device_list_id: {
    type: String,
    required: true,
  },
  device_name: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  }
});

export default mongoose.model('Devices', devicesSchema);