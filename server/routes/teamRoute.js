
import express from 'express';
import { getTeam } from '../controllers/teamController.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', authenticate, getTeam);

export default router;