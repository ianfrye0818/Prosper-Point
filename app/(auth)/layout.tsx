import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className='flex min-h-screen w-full justify-between'>
      {children}
      <div className='auth-asset'>
        <Image
          src='/icons/auth-image.jpeg'
          alt='Auth Image'
          width={800}
          height={800}
        />
      </div>
    </main>
  );
}
