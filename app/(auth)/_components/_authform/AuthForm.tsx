'use client';
import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import ZodFormFieldInput from '../_common/ZodFormFieldInput';
import { AUTH_FORM_SCHEMA } from '@/zod-schemas/index.';
import AuthFormSubmitButton from './AuthFormSubmitButton';
import AuthFormHeader from './AuthFormHeader';

export default function AuthForm({ type }: AuthFormProps) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(AUTH_FORM_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof AUTH_FORM_SCHEMA>) {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  }

  return (
    <section className='auth-form'>
      <AuthFormHeader
        type={type}
        user={user}
      />
      {user ? (
        <div className='flex flex-col gap-4'>{/* TODO: Plaid Link */}</div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            {/* email input */}
            <ZodFormFieldInput
              name='email'
              label='email'
              placeholder='example@example.com'
              control={form.control}
            />
            {/* password input */}
            <ZodFormFieldInput
              name={'password'}
              label='password'
              placeholder='******'
              control={form.control}
            />
            {/* Submit button */}
            <AuthFormSubmitButton
              type={type}
              isLoading={isLoading}
            />
          </form>
        </Form>
      )}
    </section>
  );
}
