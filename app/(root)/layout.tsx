import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import Sidebar from './_components/_nav/Sidebar';
import MobileNavBar from './_components/_nav/MobileNavBar';
import { getLoggedInUser } from '@/app/(auth)/_authActions/user.actions';
import { redirect } from 'next/navigation';
import AccoundDataProvider from '../Providers/AccoundDataProvider';

export default async function RootLayout({ children }: PropsWithChildren) {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');

  return (
    <main className='flex h-screen w-full font-inter'>
      <Sidebar user={user} />

      <div className='flex size-full flex-col'>
        <div className='root-layout'>
          <Image
            src={'/icons/logo.svg'}
            width={30}
            height={30}
            alt={'Menu Icon'}
          />
          <div>
            <MobileNavBar user={user} />
          </div>
        </div>
        <AccoundDataProvider>{children}</AccoundDataProvider>
      </div>
    </main>
  );
}
