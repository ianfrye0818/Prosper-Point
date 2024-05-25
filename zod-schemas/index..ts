import { formatTitleCase } from '@/lib/utils';
import * as z from 'zod';

export const AUTH_FORM_SCHEMA = (type: 'sign-up' | 'sign-in') =>
  z.object({
    firstName:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string()
            .min(2, 'Please enter a valid first name')
            .transform((val) => formatTitleCase(val)),
    lastName:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string()
            .min(2, 'Please enter a valid last name')
            .transform((val) => formatTitleCase(val)),
    address1:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string()
            .max(50)
            .min(2, 'Please enter a valid address')
            .transform((val) => formatTitleCase(val)),
    city:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string()
            .max(50)
            .min(2, 'Please enter a valid city')
            .transform((val) => formatTitleCase(val)),
    state:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string()
            .regex(/^[A-Za-z]{2}$/, 'Please enter a valid state (XX)')
            .transform((val) => val.toUpperCase()),
    postalCode:
      type === 'sign-in'
        ? z.string().optional()
        : z.string().regex(/^\d{5}$/, 'Please enter a valid postal code (xxxxx)'),
    dateOfBirth:
      type === 'sign-in'
        ? z.date().optional()
        : z.date().max(new Date(), 'Please enter a valid date of birth'),
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
