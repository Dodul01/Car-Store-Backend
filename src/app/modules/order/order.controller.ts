import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { OrderService } from './order.service';
import { Car } from '../car/car.model';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body;
    const zodParsedData = orderValidationSchema.parse(orderData);
    
    const car = await Car.findById(zodParsedData.car);

    if (!car) {
      res.status(404).send({
        status: false,
        message: 'Car not found',
      });
      return;
    }

    if (car.quantity <= 0) {
      res.status(404).send({
        status: false,
        message: `${car.brand} ${car.model} is out of stock.`,
      });
      return;
    }

    const totalPrice = car.price * zodParsedData.quantity;

    if (zodParsedData.totalPrice !== totalPrice) {
      res.status(404).send({
        sucess: false,
        message:
          'Invalid totalPrice. The totalPrice must be quantity * car price.',
        expectedTotalPrice: totalPrice,
        providedTotalPrice: zodParsedData.totalPrice,
      });
      return;
    }

    const orderWithPrice = {
      ...zodParsedData,
      totalPrice,
    };

    const result = await OrderService.createOderIntoDB(orderWithPrice);

    res.send({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    res.send({
      status: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderService.calculateRevenueFromDB();

    res.send({
      status: true,
      message: 'Revenue calculated successfully',
      data: {
        totalRevenue,
      },
    });
  } catch (error) {
    res.send({
      status: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getRevenue,
};
