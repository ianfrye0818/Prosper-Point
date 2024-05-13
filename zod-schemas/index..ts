import * as z from 'zod';

export const AUTH_FORM_SCHEMA = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(6, 'Please enter a min of 6 charaters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Please enter a valid password'),
});
