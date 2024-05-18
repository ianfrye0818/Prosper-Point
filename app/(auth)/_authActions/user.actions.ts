'use server';
import { ID } from 'node-appwrite';
import { createAdminClient, createSessionClient } from '../../../lib/_actions/appwrite.actions';
import { cookies } from 'next/headers';
import { extractCustomerIdFromUrl, parseStringify } from '../../../lib/utils';
import { createDwollaCustomer } from './dwolla.actions';

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const USER_COLLECTIOIN_ID = process.env.APPWRITE_USER_COLLECTION_ID;

export async function signIn({ email, password }: signInProps) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    cookies().set('auth-session', session.secret, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
    });
    const user = await getLoggedInUser();
    return parseStringify(user);
  } catch (error) {
    console.error(error);
  }
}

export async function signUp({ password, ...userData }: SignUpParams) {
  let newUserAccount;

  try {
    const { email, firstName, lastName } = userData;
    const fullname = `${firstName} ${lastName}`;

    const { account, database } = await createAdminClient();

    const newUserAccount = await account.create(ID.unique(), email, password, fullname);
    if (!newUserAccount) throw new Error('Error createing user');

    const dwollaCustomerUrl = await createDwollaCustomer({ ...userData, type: 'personal' });
    if (!dwollaCustomerUrl) throw new Error('Error createing Dwolla customer');

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await database.createDocument(DATABASE_ID, USER_COLLECTIOIN_ID, ID.unique(), {
      ...userData,
      userId: newUserAccount.$id,
      dwollaCustomerId,
      dwollaCustomerUrl,
    });

    const session = await account.createEmailPasswordSession(email, password);
    cookies().set('auth-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    });
    return parseStringify(newUser);
  } catch (error) {
    console.error(['signup-error'], error);
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

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}
