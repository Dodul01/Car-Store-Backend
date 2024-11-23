import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required.' }),
  car: z.string({required_error: 'Car is required.'}),
  quantity: z.number({required_error: 'Quantity is required.'}),
  totalPrice: z.number({required_error: 'Total price is required.'}).min(0, 'Total Price can not be negative')
});
