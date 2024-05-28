'use client';
import React from 'react';
import HeaderBox from '../_components/_common/HeaderBox';
import BankCard from '../_components/_common/BankCard';
// import { getUserAccountData } from '@/app/(auth)/_authActions/user.actions';
import { useUserAccountData } from '@/app/Providers/AccoundDataProvider';

export default function MyBanks() {
  const { error, isLoading, userAccountData } = useUserAccountData();

  if (isLoading)
    return (
      <div className='flex flex-col h-screen w-full justify-center items-center'>
        <p className='text-[30px]'>Loading....</p>
      </div>
    );

  if (error)
    return (
      <div className='flex flex-col h-screen w-full justify-center items-center'>
        <p className='text-[30px]'>Error: {error}</p>
      </div>
    );

  const { user, accounts } = userAccountData!;

  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox
          title='My Bank Accounts'
          subtext='Manage your banking activities'
        />
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold'>Your Cards</h2>
          <h3 className='text-[16px]'>Click on a card to see full account details</h3>
          <div className='flex flex-wrap gap-6'>
            {accounts &&
              accounts.data.map((account) => (
                <BankCard
                  key={account.id}
                  account={account}
                  userName={user.name}
                  showBalance={true}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
