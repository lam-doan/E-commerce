import express from 'express';
import { createProduct, getProducts } from '../controllers/productController.js';

const router = express.Router();

// Create a new product
router.post('/', createProduct);

// Get all products
router.post('/', createProduct);
router.get('/', getProducts);

export default router;