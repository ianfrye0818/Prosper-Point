import HeaderBox from '@/app/(root)/_components/_common/HeaderBox';
import RightSidebar from '@/app/(root)/_components/_nav/RightSidebar';
import TotalBalanceBox from '@/app/(root)/_components/_common/TotalBalanceBox';
import React from 'react';
import { getDataBaseUser } from '@/app/(auth)/_authActions/user.actions';

export default async function Home() {
  const user = (await getDataBaseUser()) as User;
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={user ? user.name : 'Guest'}
            subtext='Access and manage your account and transactions effeciently'
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        user={user}
        transactions={[]}
        banks={[{ currentBalance: 1250.15 }, { currentBalance: 550.0 }]}
      />
    </section>
  );
}
