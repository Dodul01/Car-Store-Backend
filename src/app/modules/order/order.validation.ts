import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required.' }),
  car: z.string({ required_error: 'Car is required.' }),
  quantity: z.number({ required_error: 'Quantity is required.' }),
  totalPrice: z
    .number({ required_error: 'Total price is required.' })
    .min(0, 'Total Price can not be negative'),
  address: z.string({ required_error: 'Customar address is required' }),
  phone: z.string({ required_error: 'Customar phone number is required' }),
  city: z.string({ required_error: 'Customar city address is required' }),
  id: z.string({ required_error: 'Order id is required' }),
});
