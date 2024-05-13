import Link from 'next/link';
import React from 'react';

export default function AuthFormFooter({ type }: AuthFormProps) {
  return (
    <footer className='flex justify-center items-center gap-1'>
      <p>{type === 'sign-in' ? "Don't have an account?" : 'Already have an accout?'}</p>
      <Link
        href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
        className='form-link'
      >
        {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
      </Link>
    </footer>
  );
}
