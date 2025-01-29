// import { Types } from 'mongoose';
import { Types } from 'mongoose';
import { Car } from '../car/car.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOderIntoDB = async (orderData: TOrder) => {
  const { car: carId, quantity } = orderData;

  const car = await Car.findById(carId);

  if (!car) {
    throw new Error('Car not found.');
  }

  if (car.quantity < quantity) {
    throw new Error('Insufficient stock.');
  }

  car.quantity -= quantity;

  if (car.quantity === 0) {
    car.inStock = false;
  }

  await car.save();

  const result = await Order.create(orderData);
  return result;
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

export const OrderService = {
  createOderIntoDB,
  calculateRevenueFromDB,
  getOrdersFromDB,
};
