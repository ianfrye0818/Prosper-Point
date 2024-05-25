import React from 'react';
import HeaderBox from '../_components/_common/HeaderBox';
import { getLoggedInUser } from '@/app/(auth)/_authActions/user.actions';
import { getAccount, getAccounts, getBanks } from '../_actions/bank.actions';
import { formatAmount } from '@/lib/utils';
import TransactionsTable from '../_components/_transactionTable/TransactionsTable';

export default async function TransactionHistory({ searchParams: { id, page } }: SearchParamProps) {
  const user = (await getLoggedInUser()) as User;

  const accounts = (await getAccounts({ userId: user.$id })) as GetAccountsData;
  if (!accounts) return null;

  const accountsData = accounts.data as Account[];
  const appwriteItemId = (id as string) || accountsData[0].appwriteItemId;
  const account = await getAccount({ appwriteItemId });
  const accountData = account?.data as Account;

  return (
    <section className='transactions'>
      <div className='transactions-header'>
        <HeaderBox
          title='Transaction History'
          subtext='See your bank details and transactions'
        />
      </div>
      <div className='space-y-6'>
        <div className='transactions-account'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-18 font-bold text-white'>{accountData.name}</h2>
            <p className='text-14 text-blue-25'>{accountData.officialName}</p>
            <p className='text-14 font-semibold tracking-[1.1px] text-white'>
              &#9679;&#9679;&#9679;&#9679; &#9679;&#9679;&#9679;&#9679; &#9679;&#9679;&#9679;&#9679;{' '}
              <span className='text-16'>{accountData.mask}</span>
            </p>
          </div>
          <div className='transactions-account-balance'>
            <p className='text-14'>Current Balance</p>
            <p className='text-24 text-center font-bold'>
              {formatAmount(accountData.currentBalance)}
            </p>
          </div>
        </div>
        <section className='flex w-full flex-col gap-6'>
          {account && account.transactions.length > 0 ? (
            <TransactionsTable transactions={account.transactions} />
          ) : (
            ''
          )}
        </section>
      </div>
    </section>
  );
}
