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
import AuthFormFooter from './AuthFormFooter';
import SignUpFormFields from './SignUpForm';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';

export default function AuthForm({ type }: AuthFormProps) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = AUTH_FORM_SCHEMA(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      //sign up with Appwright and create a plaid token

      if (type === 'sign-up') {
        const newUser = await signUp(data);
        setUser(newUser);
      } else if (type === 'sign-in') {
        const response = await signIn(data.email, data.password);
        if (response) router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'
            >
              {type === 'sign-up' && <SignUpFormFields form={form} />}

              {/* email input */}
              <ZodFormFieldInput
                name='email'
                label='Email'
                placeholder='example@example.com'
                control={form.control}
              />
              {/* password input */}
              <ZodFormFieldInput
                name={'password'}
                label='Password'
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
          <AuthFormFooter type={type} />
        </>
      )}
    </section>
  );
}
