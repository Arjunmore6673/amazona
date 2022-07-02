import express from 'express';
const orderRouter = express();
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import { generateToken, isAuth } from '../utils.js';
import Order from '../models/OrderModel.js';

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;
    const newOrder = new Order({
      orderItems: orderItems?.map((x) => ({ ...x, product: x._id })),
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'new order created', order });
  })
);

export default orderRouter;
