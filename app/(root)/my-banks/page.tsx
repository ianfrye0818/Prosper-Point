import React from 'react';
import HeaderBox from '../_components/_common/HeaderBox';
import { getLoggedInUser } from '@/app/(auth)/_authActions/user.actions';
import { getAccounts } from '../_actions/bank.actions';
import BankCard from '../_components/_common/BankCard';

export default async function MyBanks() {
  const user = (await getLoggedInUser()) as User;

  const accounts = (await getAccounts({ userId: user.$id })) as GetAccountsData;

  if (!accounts) return null;

  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox
          title='My Bank Accounts'
          subtext='Manage your banking activities'
        />
        <div className='space-y-4'>
          <h2 className='header-2'>Your Cards</h2>
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
