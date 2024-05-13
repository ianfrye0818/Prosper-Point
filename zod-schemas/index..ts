import * as z from 'zod';

export const AUTH_FORM_SCHEMA = (type: 'sign-up' | 'sign-in') =>
  z.object({
    firstName: type === 'sign-in' ? z.string().optional() : z.string().min(2),
    lastName: type === 'sign-in' ? z.string().optional() : z.string().min(2),
    address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    state: type === 'sign-in' ? z.string().optional() : z.string().max(2).min(2),
    postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(2),
    ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),

    //signin
    email: z.string().email('Please enter a valid email'),
    password: z
      .string()
      .min(6, 'Please enter a min of 6 charaters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Please enter a valid password'),
  });
