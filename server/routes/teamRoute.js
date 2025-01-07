// backend/routes/teamRoutes.js
import express from 'express';
import { getTeam } from '../controllers/teamController';
import { authenticate } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/', authenticate, getTeam);

export default router;