import { Request, Response } from 'express';
import { CarServices } from './car.service';

const createCar = async (req: Request, res: Response) => {
  try {
    const carData = req.body;
    const result = await CarServices.createCarIntoDB(carData);

    res.send({
      success: true,
      message: 'Car created successfully',
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

export const CarControllers = {
  createCar,
};
