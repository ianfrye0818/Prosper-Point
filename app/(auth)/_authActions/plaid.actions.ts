'use server';

import { plaidClient } from '@/lib/server/plaid';
import { encryptId, parseStringify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import {
  CountryCode,
  LinkTokenCreateRequest,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from 'plaid';
import { addFundingSource } from './dwolla.actions';
import { createAdminClient } from '@/lib/_actions/appwrite.actions';
import { ID } from 'node-appwrite';

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const BANK_COLLECTION_ID = process.env.APPWRITE_BANK_COLLECTION_ID;

export async function createLinkToken(user: User) {
  try {
    console.log('current user: ' + user);
    const tokenParams: LinkTokenCreateRequest = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.error(['createLinkToken'], error);
  }
}

export async function createBankAccount({
  accessToken,
  accountId,
  bankId,
  fundingSourceUrl,
  sharableId,
  userId,
}: CreateBankAccountProps) {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID,
      BANK_COLLECTION_ID,
      ID.unique(),
      {
        accessToken,
        accountId,
        bankId,
        fundingSourceUrl,
        sharableId,
        userId,
      }
    );

    return parseStringify(bankAccount);
  } catch (error) {
    console.error(['createBankAccount'], 'Error createing bank account: ', error);
  }
}

export async function exchangePublicToken({ publicToken, user }: ExchangePublicTokenProps) {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: 'dwolla' as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    //connnects bank funcitonality to user bank account
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });
    if (!fundingSourceUrl) throw Error;

    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),
    });

    revalidatePath('/');

    return parseStringify({
      publicTokenExchange: 'complete',
    });
  } catch (error) {
    console.error(['exchangePlublicToken'], error);
  }
}
