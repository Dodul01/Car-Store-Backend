import { TCar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (carData: TCar) => {
  const result = await Car.create(carData);
  return result;
};

export const CarServices = {
  createCarIntoDB,
};
