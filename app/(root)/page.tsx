'use client';
import HeaderBox from '@/app/(root)/_components/_common/HeaderBox';
import RightSidebar from '@/app/(root)/_components/_nav/RightSidebar';
import TotalBalanceBox from '@/app/(root)/_components/_common/TotalBalanceBox';
import RecentTransactions from './_components/_common/RecentTransactions';
import { getPaginatedTransactionsAndTotalPages } from '@/lib/utils';
import { useUserAccountData } from '../Providers/AccoundDataProvider';

export default function Home({ searchParams: { id, page } }: SearchParamProps) {
  // // const { user, accountsData, appwriteItemId, account, accounts, banks } = await getUserAccountData(
  // //   id
  // // );
  const { userAccountData, error, isLoading } = useUserAccountData();

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
  const { user, accountsData, appwriteItemId, account, accounts, banks } = userAccountData!;
  const { currentPage } = getPaginatedTransactionsAndTotalPages({
    page,
    transactions: account.transactions,
  });

  const compbinedData = banks.slice(0, 2).map((bank, index) => {
    return {
      ...bank,
      ...accounts.data[index],
    };
  });
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
            accounts={accountsData}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={accounts.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accountsData}
          appwriteItemId={appwriteItemId}
          page={currentPage}
          transactions={account.transactions}
        />
      </div>
      <RightSidebar
        user={user}
        transactions={account.transactions}
        banks={compbinedData}
      />
    </section>
  );
}
