import { Types } from 'mongoose';
import { TCar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (carData: TCar) => {
  const result = await Car.create(carData);
  return result;
};

const getCarFromDB = async (
  searchTerm = '',
  selectedBrand = '',
  selectedCategory = '',
  priceRange: string = '0,1000000',
) => {
  const query: any = {};
  
  // Search term filters
  if (searchTerm) {
    query.$or = [
      { brand: { $regex: searchTerm, $options: 'i' } },
      { model: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  // Brand filter
  if (selectedBrand) {
    query.brand = { $regex: selectedBrand, $options: 'i' };
  }

  // Category filter
  if (selectedCategory) {
    query.category = { $regex: selectedCategory, $options: 'i' };
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split(',').map(Number); // Convert to numbers
    query.price = { $gte: minPrice, $lte: maxPrice };
  }

  const result = await Car.find(query);
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
  deleteSingleCarFromDb,
};
