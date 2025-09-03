import Express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/index.js';

import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = Express();

app.use(cors({
  origin: 'https://orange-parakeet-5gq545jgg69xfvj97-3000.app.github.dev',
  credentials: true
}));

app.use(Express.json());

app.use('/image', Express.static(path.join(__dirname, 'src/image')));
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