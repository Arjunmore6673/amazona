import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

const app = express();
dotenv.config();

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('server ready http://localhost:' + PORT));
