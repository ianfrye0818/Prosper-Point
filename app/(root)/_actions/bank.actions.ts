'use server';

import { createAdminClient } from '@/lib/_actions/appwrite.actions';
import { plaidClient } from '@/lib/server/plaid';
import { parseStringify } from '@/lib/utils';
import { Query } from 'node-appwrite';
import { CountryCode, Institution, PaymentChannel } from 'plaid';
import { getTransactionsByBankId } from './transactions.actions';

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const BANKS_COLLECTION_ID = process.env.APPWRITE_BANK_COLLECTION_ID;

export async function getAccounts({ userId }: GetAccountsProps) {
  try {
    const banks = await getBanks({ userId });
    // console.log({ userBanks: banks });
    const accounts = await Promise.all(
      banks?.map(async (bank: Bank) => {
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        const account: Account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          appwriteItemId: bank.$id,
          institutionId: institution.institution_id,
          mask: accountData.mask!,
          name: accountData.name!,
          officialName: accountData.official_name!,
          sharableId: bank.sharableId,
          subtype: accountData.subtype!,
          type: accountData.type!,
        };
        return account;
      })
    );
    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.error(['getAccounts'], 'Error getting accounts: ', error);
  }
}

export async function getAccount({ appwriteItemId }: GetAccountProps) {
  try {
    const bank = (await getBank({ documentId: appwriteItemId })) as Bank;
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    const transferTransactionsData = await getTransactionsByBankId({ bankId: bank.$id });

    const transferTransactions = transferTransactionsData.documents.map(
      (transferData: Transaction) => ({
        id: transferData.$id,
        name: transferData.name,
        amount: transferData.amount,
        date: transferData.date,
        paymentChannel: transferData.channel,
        category: transferData.category,
        type: transferData.senderBankId === bank.$id ? 'debit' : 'credit',
      })
    );

    const institution = (await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    })) as Institution;

    const transactions = await getTransactions({ accessToken: bank.accessToken });

    const account: Account = {
      appwriteItemId: bank.$id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      id: accountData.account_id,
      mask: accountData.mask!,
      name: accountData.name!,
      officialName: accountData.official_name!,
      sharableId: bank.sharableId,
      subtype: accountData.subtype!,
      type: accountData.type,
    };

    const allTransactions = [...transactions, ...transferTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return parseStringify({
      data: account,
      transactions: allTransactions,
    });
  } catch (error) {
    console.error(['getAccount'], 'Error getting Account: ', error);
  }
}

export async function getInstitution({ institutionId }: GetInstitutionProps) {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: [CountryCode.Us],
    });

    const institution = institutionResponse.data.institution;

    return parseStringify(institution);
  } catch (error) {}
}

export async function getTransactions({ accessToken }: GetTransactionsProps) {
  let hasMore = true;
  let transactions: any = [];

  try {
    while (hasMore) {
      const response = await plaidClient.transactionsSync({ access_token: accessToken });

      const data = response.data;

      transactions = response.data.added.map((tranaction) => ({
        id: tranaction.transaction_id,
        name: tranaction.name,
        paymentChannel: tranaction.payment_channel,
        type: tranaction.payment_channel,
        accountId: tranaction.account_id,
        amount: tranaction.amount,
        pending: tranaction.pending,
        category: tranaction.category ? tranaction.category[0] : '',
        date: tranaction.date,
        image: tranaction.logo_url,
      }));

      hasMore = data.has_more;
    }

    return parseStringify(transactions);
  } catch (error) {
    console.error(['getTransactions'], 'Error getting transactions: ', error);
  }
}

export async function getBanks({ userId }: GetBanksProps) {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(DATABASE_ID, BANKS_COLLECTION_ID, [
      Query.equal('userId', userId),
    ]);
    return parseStringify(banks.documents);
  } catch (error) {
    console.error(['getBanks'], 'Error getting banks from DB', error);
    return null;
  }
}

export async function getBank({ documentId }: GetBankProps) {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(DATABASE_ID, BANKS_COLLECTION_ID, [
      Query.equal('$id', documentId),
    ]);

    if (bank.total !== 1) return null;

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.error(['getBank'], 'Error getting bank from DB', error);
    return null;
  }
}

export async function getBankByAccountId({ accountId }: GetBankByAccountIdProps) {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(DATABASE_ID, BANKS_COLLECTION_ID, [
      Query.equal('accountId', accountId),
    ]);

    if (bank.total !== 1) return null;

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.error(['getBankByAccountId'], 'Error getting bank by account id', error);
    return null;
  }
}
