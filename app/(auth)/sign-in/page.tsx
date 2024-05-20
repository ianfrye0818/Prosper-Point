import AuthForm from '@/app/(auth)/_components/_authform/AuthForm';
import React from 'react';
import { getDataBaseUser, getLoggedInUser } from '../_authActions/user.actions';
import { redirect } from 'next/navigation';

export default async function SignIn() {
  const user = await getLoggedInUser();
  if (user) redirect('/');
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type='sign-in' />
    </section>
  );
}
