import { Types } from 'mongoose';
import { Car } from '../car/car.model';
import { Order } from './order.model';
import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51PcPm62MP0L90Yjv5rrNJzlct5wUiAmxGXfFWqCdzz5Sjka70yrTPbHFsTjrbXRqs9dSy1Ad4DuduAY6iIOk5I9e00dVeD87uY',
);

const createOderIntoDB = async (orderData: any, ip: any) => {
  try {
    // console.log(orderData);

    const car = await Car.findById(orderData.car);
    if (!car) {
      throw new Error('Car not found.');
    }

    if (car.quantity < orderData.quantity) {
      throw new Error('Insufficient stock.');
    }

    car.quantity -= orderData.quantity;
    if (car.quantity === 0) {
      car.inStock = false;
    }
    await car.save();

    const orderResponse = await Order.create(orderData);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderData.totalPrice * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: orderData.email,
      metadata: {
        carId: car._id.toString(),
        quantity: orderData.quantity.toString(),
      },
    });

    await stripe.paymentIntents.confirm(paymentIntent.id, {
      payment_method: orderData.id,
    });

    return orderResponse;
  } catch (error) {
    console.error('Error creating order or confirming payment:', error);
    throw new Error('Order creation or payment confirmation failed');
  }
};

const updateOrderStatusIntoDB = async (id: string, data: any) => {
  const result = await Order.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true },
  );
  return result;
};

const deleteOrderFromDB = async (id: string) => {
  try {
    const order = await Order.findById(id);

    if (!order) {
      throw new Error('Order not found.');
    }

    const car = await Car.findById(order.car);
    if (car) {
      car.quantity += order.quantity;
      car.inStock = true;
      await car.save();
    }

    const result = await Order.findByIdAndDelete(id);

    return result;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

const getOrdersFromDB = async (email: string) => {
  try {
    // Find all orders for the given email
    const findOrder = await Order.aggregate([{ $match: { email } }]);

    // Find all cars related to the orders
    const findCars = await Promise.all(
      findOrder.map((order) =>
        Car.aggregate([{ $match: { _id: new Types.ObjectId(order.car) } }]),
      ),
    );

    // Flatten the result if necessary
    const cars = findCars.flat();

    return { orders: findOrder, cars };
  } catch (error) {
    console.error('Error fetching orders and cars:', error);
    throw error;
  }
};

const calculateRevenueFromDB = async () => {
  const result = await Order.aggregate([
    {
      $lookup: {
        from: 'cars',
        localField: 'car',
        foreignField: '_id',
        as: 'carDetails',
      },
    },
    {
      $unwind: {
        path: '$carDetails',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        _id: 0,
        revenue: {
          $multiply: ['$carDetails.price', '$quantity'],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$revenue' },
      },
    },
  ]);

  return result.length > 0 ? result[0].totalRevenue : 0;
};

const getAllOrdersFromDB = async () => {
  const orders = Order.find();
  return orders;
};

export const OrderService = {
  createOderIntoDB,
  calculateRevenueFromDB,
  getOrdersFromDB,
  getAllOrdersFromDB,
  deleteOrderFromDB,
  updateOrderStatusIntoDB,
  // verifyPayment,
};
