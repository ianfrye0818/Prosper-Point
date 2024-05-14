'use server';
import { account, database } from '../appwriteConfig';
import { ID } from 'appwrite';

export async function signIn(email: string, password: string) {
  try {
  } catch (error) {
    console.error(error);
  }
}

export async function signUp(userData: SignUpParams) {
  try {
    const response = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      userData.firstName
    );

    const dbResponse = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USER_COLLECTION_ID,
      ID.unique(),
      {
        userId: response.$id,
        dwollaCustomerUrl: '',
        dwollaCustomerId: '',
        firstName: userData.firstName,
        lastName: userData.lastName,
        address1: userData.address1,
        city: userData.city,
        postalCode: userData.postalCode,
        dateOfBirth: userData.dateOfBirth,
        ssn: userData.ssn,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
