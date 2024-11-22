import { Request, Response } from 'express';
import { CarServices } from './car.service';
import { carValidationSchema } from './car.validation';

const createCar = async (req: Request, res: Response) => {
  try {
    const carData = req.body;
    const zodParsedData = carValidationSchema.parse(carData);
    const result = await CarServices.createCarIntoDB(zodParsedData);

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

const getCar = async (req: Request, res: Response) => {
  try {
    const result = await CarServices.getCarFromDB();

    res.send({
      status: true,
      message: 'Cars retrieved successfully',
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

const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;

    const result = await CarServices.getSingleCarFromDB(carId);

    res.send({
      status: true,
      message: 'Car retrieved successfully',
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

const updateSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const updates = req.body;

    const result = await CarServices.updateSingleCarFromDB(carId, updates);

    res.send({
      status: true,
      message: 'Car retrieved successfully',
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

const deleteSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarServices.deleteSingleCarFromDb(carId);

    res.send({
      status: true,
      message: 'Car deleted successfully',
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
  getCar,
  getSingleCar,
  updateSingleCar,
  deleteSingleCar,
};
