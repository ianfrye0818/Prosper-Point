'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import ZodFormFieldInput from './ZodFormFieldInput';
import { AUTH_FORM_SCHEMA } from '@/zod-schemas/index.';

export default function AuthForm({ type }: AuthFormProps) {
  const [user, setUser] = useState(null);

  const form = useForm({
    resolver: zodResolver(AUTH_FORM_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof AUTH_FORM_SCHEMA>) {
    console.log(values);
  }

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link
          href='/'
          className='cursor-pointer flex items-center gap-1'
        >
          <Image
            src='/icons/logo.svg'
            alt='logo'
            width={34}
            height={34}
          />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Prosper Point</h1>
        </Link>
        <div className='flex flex-col gap-2 md:gap-3'>
          <h1 className='text-24 lg:text-35 font-semibold text-gray-900'>
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign up'}
            <p className='text-16 font-normal text-gray-600'>
              {user ? 'Link your account to get started' : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>{/* TODO: Plaid Link */}</div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <ZodFormFieldInput
              name='email'
              label='email'
              placeholder='example@example.com'
              control={form.control}
            />

            <ZodFormFieldInput
              name={'password'}
              label='password'
              placeholder='******'
              control={form.control}
            />

            <Button
              variant={'outline'}
              type='submit'
            >
              Submit
            </Button>
          </form>
        </Form>
      )}
    </section>
  );
}
