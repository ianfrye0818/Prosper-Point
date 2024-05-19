'use server';
import { Client } from 'dwolla-v2';

export interface CreateFundingSourceOptions {
  customerId: string;
  fundingSourceName: string;
  plaidToken: string;
  _links: object;
}

function getEnvionment(): 'production' | 'sandbox' {
  const enviornment = process.env.DWOLLA_ENV;

  switch (enviornment) {
    case 'sandbox':
      return 'sandbox';
    case 'production':
      return 'production';
    default:
      throw new Error("Dwolla enviornment should either be set to 'sandbox' or 'production'");
  }
}
const dwollaClient = new Client({
  environment: getEnvionment(),
  key: process.env.DWOLLA_KEY,
  secret: process.env.DWOLLA_SECRET,
});

export async function createFundingSource(options: CreateFundingSourceOptions) {
  try {
    return await dwollaClient
      .post(`customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get('location'));
  } catch (error) {
    console.error(['createFundingSource'], 'Creating a funding source failed: ', error);
  }
}

export async function createOnDemandAuthorzation() {
  try {
    const onDemandAuthorization = await dwollaClient.post('on-demand-authorizations');
    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch (error) {
    console.error(['createOnDemandAuthorzation'], error);
  }
}

export async function createDwollaCustomer(newCustomer: NewDwollaCustomerParams) {
  try {
    return await dwollaClient
      .post('customers', newCustomer)
      .then((res) => res.headers.get('location'));
  } catch (error) {
    console.error(['createDwollaCustomer'], 'Createing Dwolla customer failed: ', error);
  }
}

export async function createTransfer({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) {
  try {
    const requestBody: DwollaRequestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: 'USD',
        value: amount,
      },
    };
    return await dwollaClient
      .post('transfers', requestBody)
      .then((res) => res.headers.get('location'));
  } catch (error) {
    console.error(['createTranfer'], 'Error creating tranfer: ', error);
  }
}

export async function addFundingSource({
  bankName,
  dwollaCustomerId,
  processorToken,
}: AddFundingSourceParams) {
  try {
    const dwollaAuthLinks = await createOnDemandAuthorzation();
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };
    console.log('funding source Options: ', fundingSourceOptions);
    return await createFundingSource(fundingSourceOptions);
  } catch (error) {
    console.error(['addFundingSource'], 'Error adding funding source: ', error);
  }
}
