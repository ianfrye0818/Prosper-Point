import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

declare interface AuthFormHeaderProps extends AuthFormProps {
  user: any;
}

export default function AuthFormHeader({ type, user }: AuthFormHeaderProps) {
  return (
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
          {user && type === 'sign-up' ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign up'}
          <p className='text-16 font-normal text-gray-600'>
            {user && type === 'sign-up'
              ? 'Link your account to get started'
              : 'Please enter your details'}
          </p>
        </h1>
      </div>
    </header>
  );
}
