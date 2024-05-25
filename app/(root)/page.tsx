import HeaderBox from '@/app/(root)/_components/_common/HeaderBox';
import RightSidebar from '@/app/(root)/_components/_nav/RightSidebar';
import TotalBalanceBox from '@/app/(root)/_components/_common/TotalBalanceBox';

import { getLoggedInUser } from '@/app/(auth)/_authActions/user.actions';
import { getAccount, getAccounts, getBanks } from './_actions/bank.actions';
import RecentTransactions from './_components/_common/RecentTransactions';

export default async function Home({ searchParams: { id, page } }: SearchParamProps) {
  const user = (await getLoggedInUser()) as User;

  const accounts = (await getAccounts({ userId: user.$id })) as GetAccountsData;
  const banks = (await getBanks({ userId: user.$id })) as Bank[];

  const compbinedData = banks.slice(0, 2).map((bank, index) => {
    return {
      ...bank,
      ...accounts.data[index],
    };
  });

  const currentPage = Number((page as string) || 1);

  if (!accounts) return null;

  const accountsData = accounts.data as Account[];
  const appwriteItemId = (id as string) || accountsData[0].appwriteItemId;
  const account = await getAccount({ appwriteItemId });

  if (!account) return null;
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
