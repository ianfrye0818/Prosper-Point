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
    console.log({ isLoading });
    const getAccountData = async () => {
      try {
        const data = await getUserAccountData(id);
        setAccountData(data);
      } catch (err) {
        console.error('Failed to fetch account data', err);
        setError('Failed to fetch account data');
      } finally {
        setIsLoading(false);
      }
    };
    getAccountData();
    console.log('rendering');
  }, [id]);

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
