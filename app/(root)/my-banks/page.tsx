import React from 'react';
import HeaderBox from '../_components/_common/HeaderBox';
import BankCard from '../_components/_common/BankCard';
import { getUserAccountData } from '@/lib/utils';

export default async function MyBanks() {
  const { accounts, user } = await getUserAccountData();
  if (!accounts) return null;

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
