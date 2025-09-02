// server.js
import Express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/index.js';

import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = Express();
app.use(Express.json());

connectDB(); // 🔗 Connect to MongoDB

app.use('/order', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.send('🛒 eCommerce API is alive');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});