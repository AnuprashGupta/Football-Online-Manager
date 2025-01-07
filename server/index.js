// backend/index.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
// import teamRoutes from './routes/teamRoutes.js';
// import marketRoutes from './routes/marketRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));