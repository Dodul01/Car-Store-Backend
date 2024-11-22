import { Types } from 'mongoose';
import { TCar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (carData: TCar) => {
  const result = await Car.create(carData);
  return result;
};

const getCarFromDB = async () => {
  const result = await Car.find();
  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await Car.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
  ]);

  return result;
};

const updateSingleCarFromDB = async (id: string, updates: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true },
  );
  return result;
};

const deleteSingleCarFromDb = async (id: string) => {
  const result = await Car.deleteOne({ _id: new Types.ObjectId(id) });
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getCarFromDB,
  getSingleCarFromDB,
  updateSingleCarFromDB,
  deleteSingleCarFromDb
};
