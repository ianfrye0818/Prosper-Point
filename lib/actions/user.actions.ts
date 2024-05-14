'use server';
import { ID } from 'node-appwrite';
import { createAdminClient, createSessionClient } from '../server/appwrite';
import { cookies } from 'next/headers';
import { parseStringify } from '../utils';

export async function signIn(email: string, password: string) {
  try {
    const { account } = await createSessionClient();
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

export async function signUp(userData: SignUpParams) {
  try {
    const { email, password, firstName, lastName } = userData;
    const fullname = `${firstName} ${lastName}`;
    const { account } = await createAdminClient();
    const newUser = await account.create(ID.unique(), email, password, fullname);
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

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
