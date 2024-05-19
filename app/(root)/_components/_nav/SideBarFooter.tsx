'use client';
import { signOut } from '@/app/(auth)/_authActions/user.actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React from 'react';

export default function SideBarFooter({ user, type }: FooterProps) {
  const router = useRouter();

  async function handleSignOut() {
    try {
      const signedOut = await signOut();
      if (signedOut) router.push('/sign-in');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <footer className='footer'>
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className='text-xl font-bold text-gray-700'>{user.name[0] ?? ''}</p>
      </div>
      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
        <h1 className='text-14 truncate text-gray-700 font-semibold'>{user.name ?? ''}</h1>
        <p className='text-14 truncate font-normal text-gray-600'>{user.email ?? ''}</p>
      </div>
      <button
        onClick={handleSignOut}
        className='footer_image'
      >
        <Image
          src={'icons/logout.svg'}
          alt='logout'
          fill
        />
      </button>
    </footer>
  );
}
