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

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.status(200).send(order);
    } else {
      res.status(404).send({ message: 'order not found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_ime: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.send({ message: 'order paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'order not found' });
    }
  })
);
export default orderRouter;
