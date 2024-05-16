import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className='flex min-h-screen w-full justify-between'>
      {children}
      <div className='auth-asset'>
        <div>
          {/* TODO: Replace with your own image */}
          <Image
            src='/icons/auth-image.svg'
            alt='Auth Image'
            width={500}
            height={500}
          />
        </div>
      </div>
    </main>
  );
}
