import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import refreshTokenRoutes from './routes/refreshTokenRoutes.js';

dotenv.config();

connectDB();

const app = express();

// middleware to parse json (from req.body)
app.use(express.json());
app.use(cookieParser())

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.get('/', (req, res) => {
    res.send('API is running');
});

/* mount the available API routes */
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/refresh-access-token', refreshTokenRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

/* handling 404 error */
app.use(notFoundHandler)

/* handling general errors */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`));