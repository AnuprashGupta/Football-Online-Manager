// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
// import teamRoutes from './routes/teamRoutes.js';
// import marketRoutes from './routes/marketRoutes.js';
import teamRoutes from './routes/teamRoute.js'
import marketRoutes from './routes/marketRoute.js'
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/team', teamRoutes);
app.use('/market', marketRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));