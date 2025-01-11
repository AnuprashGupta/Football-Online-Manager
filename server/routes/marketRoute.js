
import express from 'express';
import { getMarket, addPlayerToMarket, buyPlayer, removePlayerFromMarket } from '../controllers/marketController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getMarket);
router.post('/', authenticate, addPlayerToMarket);
router.delete('/', authenticate, removePlayerFromMarket);
router.post('/buy', authenticate, buyPlayer);

export default router;