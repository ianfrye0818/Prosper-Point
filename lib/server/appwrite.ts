'use server';
import { Client, Account, ID, Databases, Users } from 'node-appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  const session = cookies().get('auth-session');
  if (!session || !session.value) throw new Error('No Session');

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },

    get database() {
      return new Databases(client);
    },

    get user() {
      return new Users(client);
    },
  };
}

async function signUpWithEmail(userData: SignUpParams) {
  const { email, password, firstName: name } = userData;
  const { account } = await createAdminClient();
  await account.create(ID.unique(), email, password, name);
  const session = await account.createEmailPasswordSession(email, password);

  cookies().set('auth-session', session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });
  redirect('/');
}

export { signUpWithEmail, createAdminClient, createSessionClient };
