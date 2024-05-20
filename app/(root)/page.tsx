import HeaderBox from '@/app/(root)/_components/_common/HeaderBox';
import RightSidebar from '@/app/(root)/_components/_nav/RightSidebar';
import TotalBalanceBox from '@/app/(root)/_components/_common/TotalBalanceBox';
import React from 'react';
import { getDataBaseUser, getLoggedInUser } from '@/app/(auth)/_authActions/user.actions';
import { getAccount, getAccounts, getBanks, getTransactions } from './_actions/bank.actions';

export default async function Home({ searchParams: { id, page } }: SearchParamProps) {
  const user = await getLoggedInUser();
  const accounts = (await getAccounts({ userId: user.$id })) as GetAccountsData;

  if (!accounts) return null;
  const accountsData = accounts.data;
  const appwriteItemId = (id as string) || accountsData[0].id;

  const account = await getAccount({ appwriteItemId });

  console.log({ accountsData, account });

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
            accounts={accounts.data}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={accounts.totalCurrentBalance}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        user={user}
        transactions={[]}
        banks={[]}
      />
    </section>
  );
}
