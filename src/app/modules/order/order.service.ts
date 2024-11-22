// import { Types } from 'mongoose';
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
};
