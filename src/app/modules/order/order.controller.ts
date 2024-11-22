import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParsedData = orderValidationSchema.parse(orderData);
    const result = await OrderService.createOderIntoDB(zodParsedData);

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

export const OrderControllers = {
  createOrder,
};
