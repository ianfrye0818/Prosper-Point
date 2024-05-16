import * as z from 'zod';

export const AUTH_FORM_SCHEMA = (type: 'sign-up' | 'sign-in') =>
  z.object({
    firstName:
      type === 'sign-in'
        ? z.string().optional()
        : z.string().min(2, 'Please enter a valid first name'),
    lastName:
      type === 'sign-in'
        ? z.string().optional()
        : z.string().min(2, 'Please enter a valid last name'),
    address1:
      type === 'sign-in'
        ? z.string().optional()
        : z.string().max(50).min(2, 'Please enter a valid address'),
    city:
      type === 'sign-in'
        ? z.string().optional()
        : z.string().max(50).min(2, 'Please enter a valid city'),
    state:
      type === 'sign-in'
        ? z.string().optional()
        : z.string().regex(/^[A-Z]{2}$/, 'Please enter a valid state (XX)'),
    postalCode:
      type === 'sign-in'
        ? z.string().optional()
        : z.string().regex(/^\d{5}$/, 'Please enter a valid postal code (xxxxx)'),
    dateOfBirth:
      type === 'sign-in'
        ? z.string().optional()
        : z.string().regex(/^\d{2}-\d{2}-\d{4}$/, 'Please enter a valid date (dd-mm-yyyy)'),
    ssn:
      type === 'sign-in'
        ? z.string().optional()
        : z.string().regex(/^\d{3}-\d{2}-\d{4}$/, 'Please enter a valid SSN (xxx-xx-xxxx'),

    //signin
    email: z.string().email('Please enter a valid email'),
    password: z
      .string()
      .min(6, 'Please enter a min of 6 charaters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Please enter a valid password'),
  });
