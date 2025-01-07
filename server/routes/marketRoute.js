// backend/routes/marketRoutes.js
import express from 'express';
import { getMarket, addPlayerToMarket, buyPlayer } from '../controllers/marketController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getMarket);
router.post('/', authenticate, addPlayerToMarket);
router.post('/buy', authenticate, buyPlayer);

export default router;