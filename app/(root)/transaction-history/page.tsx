'use client';
import React from 'react';
import HeaderBox from '../_components/_common/HeaderBox';
import { formatAmount, getPaginatedTransactionsAndTotalPages } from '@/lib/utils';
import TransactionsTable from '../_components/_transactionTable/TransactionsTable';
import Pagination from '../_components/_common/Pagination';
import { BankDropdown } from '../payment-transfer/_components/_TransferForm/BankDropDown';
import { getUserAccountData } from '@/app/(auth)/_authActions/user.actions';
import { useUserAccountData } from '@/app/Providers/AccoundDataProvider';

export default function TransactionHistory({ searchParams: { id, page } }: SearchParamProps) {
  // const { accountData, account, accountsData } = await getUserAccountData(id);

  const { userAccountData, setAccountData, isLoading, error } = useUserAccountData();

  // if (isLoading) return null;
  // if (error) return <p>{error}</p>;

  const { accountData, account, accountsData } = userAccountData!;

  const { currentTransactions, totalPages, currentPage } = getPaginatedTransactionsAndTotalPages({
    page,
    transactions: account!.transactions,
  });

  return (
    <section className='transactions'>
      <div className='transactions-header'>
        <HeaderBox
          title='Transaction History'
          subtext='See your bank details and transactions'
        />
        <BankDropdown
          accounts={accountsData}
          currentAccount={account.data}
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
          {account && currentTransactions && currentTransactions.length > 0 ? (
            <>
              <TransactionsTable transactions={currentTransactions} />
              {totalPages > 1 && (
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                />
              )}
            </>
          ) : (
            ''
          )}
        </section>
      </div>
    </section>
  );
}
