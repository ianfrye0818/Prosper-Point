import HeaderBox from '@/app/(root)/_components/_common/HeaderBox';
import RightSidebar from '@/app/(root)/_components/_nav/RightSidebar';
import TotalBalanceBox from '@/app/(root)/_components/_common/TotalBalanceBox';
import React from 'react';

export default function Home() {
  const loggedIn = { firstName: 'Ian', lastName: 'Frye', email: 'ianfrye@gmail.com' };

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn ? loggedIn.firstName : 'Guest'}
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
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 1250.15 }, { currentBalance: 550.0 }]}
      />
    </section>
  );
}
