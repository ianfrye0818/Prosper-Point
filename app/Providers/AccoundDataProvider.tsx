'use client';

import {
  useEffect,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import { getUserAccountData } from '../(auth)/_authActions/user.actions';
import { useSearchParams } from 'next/navigation';
import { ThreeDots } from 'react-loader-spinner';

interface UserAccountData {
  user: User;
  accountsData: Account[];
  appwriteItemId: string;
  accountData: Account;
  account: GetAccountData;
  accounts: GetAccountsData;
  banks: Bank[];
}

interface UserAccountDataContextType {
  accountData: UserAccountData | null;
  setAccountData: Dispatch<SetStateAction<UserAccountData | null>>;
  isLoading: boolean;
  error: string | null;
}

const UserAccountDataContext = createContext<UserAccountDataContextType | null>(null);

export default function AccountDataProvider({ children }: { children: ReactNode }) {
  const [accountData, setAccountData] = useState<UserAccountData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useSearchParams();
  const id = params.get('id') || '';

  useEffect(() => {
    const getAccountData = async () => {
      setIsLoading(true);
      try {
        const data = await getUserAccountData(id);
        setAccountData(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch account data', err);
        setError('Failed to fetch account data');
        setIsLoading(false);
      }
    };
    getAccountData();
    console.log('rendering');
  }, [id]);

  if (isLoading)
    return (
      <div className='flex flex-col h-screen w-full justify-center items-center'>
        <ThreeDots
          color='#0179FE'
          height={100}
          width={100}
        />
      </div>
    );
  if (error)
    return (
      <div className='flex flex-col h-screen w-full justify-center items-center'>
        <p className='text-[30px]'>Error: {error}</p>
      </div>
    );

  return (
    <UserAccountDataContext.Provider value={{ accountData, setAccountData, isLoading, error }}>
      {children}
    </UserAccountDataContext.Provider>
  );
}

export function useUserAccountData() {
  const context = useContext(UserAccountDataContext);
  if (!context) {
    throw new Error('useUserAccountData must be used within a UserAccountDataProvider');
  }

  const { accountData: userAccountData, setAccountData, isLoading, error } = context;
  return { userAccountData, setAccountData, isLoading, error };
}
