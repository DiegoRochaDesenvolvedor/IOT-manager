import express, { Express } from 'express';
import connectDB from '../database/config/db';
import router from './router';
import cors from 'cors';

const app: Express = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.listen(4000, () => console.log('Server running on port 4000'));