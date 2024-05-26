import HeaderBox from '@/app/(root)/_components/_common/HeaderBox';
import RightSidebar from '@/app/(root)/_components/_nav/RightSidebar';
import TotalBalanceBox from '@/app/(root)/_components/_common/TotalBalanceBox';
import RecentTransactions from './_components/_common/RecentTransactions';
import { getPaginatedTransactionsAndTotalPages, getUserAccountData } from '@/lib/utils';

export default async function Home({ searchParams: { id, page } }: SearchParamProps) {
  const { user, accountsData, appwriteItemId, account, accounts, banks } = await getUserAccountData(
    id
  );
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
