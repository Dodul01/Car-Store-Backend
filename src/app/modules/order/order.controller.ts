import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { OrderService } from './order.service';
import { Car } from '../car/car.model';
import { TOrderStatus } from './order.interface';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body;
    // console.log(orderData);

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
      status: 'Pending' as TOrderStatus,
    };

    const result = await OrderService.createOderIntoDB(orderWithPrice, req.ip);

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

// const verifyPayment = async (req: Request, res: Response) => {
//   try {
//     const order = await OrderService.verifyPayment(
//       req.query.order_id as string,
//     );

//     res.send({
//       status: true,
//       message: 'Order verifyed successfully.',
//       data: order,
//     });
//   } catch (error) {
//     res.send({
//       status: false,
//       message: 'Something went wrong!',
//       error,
//     });
//   }
// };

const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const totalOrder = await OrderService.getOrdersFromDB(email);

    res.send({
      status: true,
      message: 'Order Retrived successfully.',
      data: totalOrder,
    });
  } catch (error) {
    res.send({
      status: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await OrderService.updateOrderStatusIntoDB(id, data);

    res.send({
      status: true,
      message: 'Status updated successfully.',
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

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await OrderService.deleteOrderFromDB(id);

    res.send({
      status: true,
      message: 'Order deleted successfully.',
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

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const allOrders = await OrderService.getAllOrdersFromDB();

    res.send({
      status: true,
      message: 'All Order Retrived successfully',
      data: {
        allOrders,
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
  getOrders,
  getAllOrders,
  deleteOrder,
  updateOrderStatus,
  // verifyPayment,
};
