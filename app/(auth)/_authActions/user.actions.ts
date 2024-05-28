'use server';
import { Account as UserAccount, Databases, ID, Models, Query } from 'node-appwrite';
import { createAdminClient, createSessionClient } from '../../../lib/_actions/appwrite.actions';
import { cookies } from 'next/headers';
import { extractCustomerIdFromUrl, parseStringify } from '../../../lib/utils';
import { createDwollaCustomer, deactivateDwollaCustomer } from './dwolla.actions';
import { redirect } from 'next/navigation';
import { getAccount, getAccounts, getBanks } from '@/app/(root)/_actions/bank.actions';

type UserData = Omit<SignUpParams, 'password'>;
interface CreateUserAccountProps {
  account: UserAccount;
  email: string;
  name: string;
  password: string;
}

interface CreateNewUserAccountInDBProps {
  database: Databases;
  userData: UserData;
  userId: string;
  dwollaCustomerId: string;
  dwollaCustomerUrl: string;
}
interface CreateSessionAndSetCookiesProps {
  account: UserAccount;
  email: string;
  password: string;
}

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const USER_COLLECTIOIN_ID = process.env.APPWRITE_USER_COLLECTION_ID;

export async function signIn({ email, password }: SignInProps) {
  try {
    const { account } = await createAdminClient();
    const session = await createSessionAndSetCookies({ account, email, password });
    const user = await getDataBaseUser({ userId: session.userId });
    return parseStringify(user);
  } catch (error) {
    console.error(error);
  }
}

export async function signUp({ password, ...userData }: SignUpParams) {
  const { account, database, user } = await createAdminClient();
  let newUserAccount;
  let dwollaCustomerId;

  try {
    const { email, name } = userData;

    newUserAccount = await createUserAccount({ account, email, password, name });
    try {
      const dwollaCustomerUrl = await createDwollCustomerAccount(userData);
      dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

      const newUser = await createNewUserAccountInDB({
        database,
        userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl,
      });

      await createSessionAndSetCookies({ account, email, password });

      return parseStringify(newUser);
    } catch (dwollaError) {
      user.delete(newUserAccount.$id);
      if (dwollaCustomerId) deactivateDwollaCustomer(dwollaCustomerId);
      throw dwollaError;
    }
  } catch (error) {
    console.error(['signup-errr'], error);
    if (newUserAccount) {
      try {
        await database.deleteDocument(DATABASE_ID, USER_COLLECTIOIN_ID, newUserAccount.$id);
      } catch (deleteError) {
        console.error(['delete-user-err'], deleteError);
      }
      throw error;
    }
  }
}

export async function signOut() {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession('current');
    cookies().delete('auth-session');
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getLoggedInUser(): Promise<User | null> {
  try {
    const { account } = await createSessionClient();
    const userAccount = await account.get();
    if (!userAccount) throw new Error('User account not found');
    const user = (await getDataBaseUser({ userId: userAccount.$id })) as User;
    if (!user) throw new Error('User not found');
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export async function getDataBaseUser({ userId }: GetDataBaseUserProps) {
  try {
    const { database } = await createAdminClient();
    const userDocList = await database.listDocuments<Models.Document>(
      DATABASE_ID,
      USER_COLLECTIOIN_ID,
      [Query.equal('userId', userId)]
    );
    if (userDocList.documents.length === 0) throw new Error('Document could not be found');
    const user = userDocList.documents[0];
    return parseStringify(user);
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function createUserAccount({ account, email, name, password }: CreateUserAccountProps) {
  const newUserAccount = await account.create(ID.unique(), email, password, name);
  if (!newUserAccount) throw new Error('Error createing user');
  return newUserAccount;
}

async function createDwollCustomerAccount(userData: UserData) {
  const dwollaCustomerUrl = await createDwollaCustomer({ ...userData, type: 'personal' });
  if (!dwollaCustomerUrl) throw new Error('Error createing Dwolla customer');
  return dwollaCustomerUrl;
}

async function createNewUserAccountInDB({
  database,
  userData,
  userId,
  dwollaCustomerId,
  dwollaCustomerUrl,
}: CreateNewUserAccountInDBProps) {
  const newUser = await database.createDocument(DATABASE_ID, USER_COLLECTIOIN_ID, ID.unique(), {
    ...userData,
    userId,
    dwollaCustomerId,
    dwollaCustomerUrl,
  });
  return newUser;
}

async function createSessionAndSetCookies({
  account,
  email,
  password,
}: CreateSessionAndSetCookiesProps) {
  const session = await account.createEmailPasswordSession(email, password);
  cookies().set('auth-session', session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });

  return session;
}

export async function getUserAccountData(id?: string | string[]) {
  try {
    const user = await getLoggedInUser();
    if (!user) redirect('/sign-in');

    const accounts = (await getAccounts({ userId: user.$id })) as GetAccountsData;
    if (!accounts) throw new Error('No accounts found');

    const banks = (await getBanks({ userId: user.$id })) as Bank[];
    if (!banks) throw new Error('No banks found');

    const accountsData = accounts.data as Account[];

    const appwriteItemId = (id as string) || accountsData[0].appwriteItemId;

    const account = (await getAccount({ appwriteItemId })) as GetAccountData;
    if (!account) throw new Error('No account found');

    const accountData = account.data as Account;

    return { user, accountsData, appwriteItemId, accountData, account, accounts, banks };
  } catch (error) {
    console.error(['getUserAccountData'], error);
    throw error; //rethrow error for the frontend to handle
  }
}
