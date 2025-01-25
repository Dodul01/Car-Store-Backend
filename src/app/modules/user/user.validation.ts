import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Name must be string.',
  }),
  email: z
    .string({
      required_error: 'Email is required.',
      invalid_type_error: 'Email must be string.',
    })
    .email({ message: 'Invalid email.' }), 
  password: z
    .string({ invalid_type_error: 'Password must be string.' })
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(20, { message: 'Password can not be more then 20 characters.' }),
  role: z.enum(['seller', 'admin']).default('seller'),
});

export const userValidation = {
  userValidationSchema,
};
