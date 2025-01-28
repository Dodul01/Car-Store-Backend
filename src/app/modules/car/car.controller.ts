import { Request, Response } from 'express';
import { CarServices } from './car.service';
import { carValidationSchema } from './car.validation';
import { ZodError } from 'zod';

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
    if (error instanceof ZodError) {
      const validationErrors = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      res.status(400).send({
        message: 'Validation failed',
        success: false,
        error: {
          name: 'ValidationError',
          errors: validationErrors,
        },
        stack: error.stack,
      });
    } else if (error instanceof Error) {
      res.status(400).send({
        message: 'Validation Error',
        success: false,
        error: {
          name: error.name,
          message: error.message,
        },
        stack: error.stack,
      });
    } else {
      res.status(500).send({
        message: 'An unknown error occurred',
        success: false,
        error: { message: String(error) },
      });
    }
  }
};

const getCar = async (req: Request, res: Response) => {
  try {
    const { searchTerm, selectedBrand, selectedCategory, priceRange } =
      req.query;
    const result = await CarServices.getCarFromDB(searchTerm as string, selectedBrand as string, selectedCategory as string, priceRange as string);


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
      message: 'Car updated successfully',
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      res.status(400).send({
        message: 'Validation failed',
        success: false,
        error: {
          name: 'ValidationError',
          errors: validationErrors,
        },
        stack: error.stack,
      });
    } else if (error instanceof Error) {
      res.status(400).send({
        message: 'Validation Error',
        success: false,
        error: {
          name: error.name,
          message: error.message,
        },
        stack: error.stack,
      });
    } else {
      res.status(500).send({
        message: 'An unknown error occurred',
        success: false,
        error: { message: String(error) },
      });
    }
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
