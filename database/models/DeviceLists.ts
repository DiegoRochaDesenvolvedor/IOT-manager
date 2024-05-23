import mongoose, { Schema } from 'mongoose';

const deviceListsSchema = new Schema({
  device: {
    type: String,
    required: true
  },
  configuration: {
    type: Schema.Types.Mixed,
    required: true
  },
  created: {
    type: Date,
    required: true,
  }
});

export default mongoose.model('DeviceLists', deviceListsSchema);