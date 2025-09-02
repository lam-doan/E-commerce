import Express from 'express';
import { addItemToCart, deleteItemFromCart, getCart } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Express.Router();

router.get('/', authMiddleware, getCart)
router.post('/add', authMiddleware, addItemToCart);
router.delete('/delete/:product_id', authMiddleware, deleteItemFromCart);
export default router;