import express from 'express';
import { checkoutOrder, updateOrderStatus } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/checkout', authMiddleware, checkoutOrder);
router.patch('/:order_id/status', authMiddleware, updateOrderStatus);

export default router;