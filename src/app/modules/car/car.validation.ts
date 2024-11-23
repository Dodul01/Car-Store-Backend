import { z } from 'zod';

export const carValidationSchema = z.object({
  brand: z.string({required_error: 'Brand is required'}),
  model: z.string({required_error: 'Model is required'}),
  year: z.number({required_error: 'Year is required'}),
  price: z.number({required_error: 'Price is required'}).min(1, 'Price cannot be negative.'),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {required_error: 'Category can not be empty.'}),
  description: z.string({required_error: 'Description is required'}),
  quantity: z.number({required_error: 'Quantity is required'}).min(1, 'Quantity must be at last 1.'),
  inStock: z.boolean({required_error: 'InStock is required'}),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});