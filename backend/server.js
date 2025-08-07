import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; 
import router from './routes/auth_routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173",  // React app ka origin
  credentials: true                // Important: Allow credentials
}));
app.use('/api', router);




app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});