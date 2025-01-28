import { model, Schema } from 'mongoose';
import { TCar } from './car.interface';

const carSchema = new Schema<TCar>(
  {
    brand: { type: String, required: [true, 'Brand name is required.'] },
    model: { type: String, required: [true, 'Model is required.'] },
    year: { type: Number, required: [true, 'Year is required.'] },
    price: { type: Number, required: [true, 'Price is required.'] },
    category: {
      type: String,
      enum: {
        values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        message: '{VALUE} is not a valid category.',
      },
    },
    image: { type: String, required: [true, 'Image is required'] },
    description: { type: String, required: [true, 'Description is required.'] },
    quantity: { type: Number, required: [true, 'Quantity is required.'] },
    inStock: { type: Boolean, required: [true, 'Stock value is required'] },
  },
  {
    timestamps: true,
  },
);

export const Car = model<TCar>('Car', carSchema);
