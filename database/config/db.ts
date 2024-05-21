import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mananger', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions); 
    console.log('MongoDB Connected...');
  } catch (err:any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;