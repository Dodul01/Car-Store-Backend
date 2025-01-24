import { z } from 'zod';

export const userValidationSchema = z.object({
  name: z.string({ invalid_type_error: 'Name must be a string.' }),
  password: z
    .string({ invalid_type_error: 'Password must be a string' })
    .min(6, { message: 'Password must be more then 6 characters' })
    .max(20, { message: 'Password can not be more then 20 characters.' }),
});

