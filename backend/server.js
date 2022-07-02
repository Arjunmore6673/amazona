import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log('connected to mongodb');
  })
  .catch((e) => {
    console.log('error');
  });

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('server ready http://localhost:' + PORT));
