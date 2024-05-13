import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import Sidebar from './_components/_nav/Sidebar';
import MobileNavBar from './_components/_nav/MobileNavBar';

export default function RootLayout({ children }: PropsWithChildren) {
  const loggedIn = {
    firstName: 'Ian',
    lastName: 'Frye',
  };

  return (
    <main className='flex h-screen w-full font-inter'>
      <Sidebar user={loggedIn} />

      <div className='flex size-full flex-col'>
        <div className='root-layout'>
          <Image
            src={'/icons/logo.svg'}
            width={30}
            height={30}
            alt={'Menu Icon'}
          />
          <div>
            <MobileNavBar user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
