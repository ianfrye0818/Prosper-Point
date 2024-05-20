/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: Date;
  ssn: string;
  email: string;
  password: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type User = {
  $id: string;
  email: string;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: Date;
  ssn: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

declare type Account = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  name: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  sharableId: string;
};

declare interface GetAccountsData {
  data: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}

declare type Transaction = {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  type: string;
  $createdAt: string;
  channel: string;
  senderBankId: string;
  receiverBankId: string;
};

declare interface Bank {
  $id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  sharableId: string;
}

declare type AccountTypes = 'depository' | 'credit' | 'loan ' | 'investment' | 'other';

declare type Category = 'Food and Drink' | 'Travel' | 'Transfer';

declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};

declare type Receiver = {
  firstName: string;
  lastName: string;
};

declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

declare type AddFundingSourceParams = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
};

declare interface DwollaRequestBody {
  _links: {
    source: {
      href: string;
    };
    destination: {
      href: string;
    };
  };
  amount: {
    currency: 'USD';
    value: string;
  };
}

declare type NewDwollaCustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: Date;
  ssn: string;
};

declare interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

declare interface BankInfoProps {
  account: Account;
  appwriteItemId?: string;
  type: 'full' | 'card';
}

declare interface HeaderBoxProps {
  type?: 'title' | 'greeting';
  title: string;
  subtext: string;
  user?: string;
}

declare interface MobileNavProps {
  user: User;
}

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface PlaidLinkProps {
  user: User;
  variant?: 'primary' | 'ghost';
  dwollaCustomerId?: string;
}

declare interface ExchangePublicTokenProps {
  user: User;
  publicToken: string;
}

declare interface CreateBankAccountProps {
  userId: string;
  bankId: string;
  accountId: string;
  accessToken: string;
  fundingSourceUrl: string;
  sharableId: string;
}

declare type AppwriteUser = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  accountId: string;
  email: string;
  name: string;
  items: string[];
  accessToken: string;
  image: string;
};
declare interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
  user?: User;
}

declare interface BankDropdownProps {
  accounts: Account[];
  setValue?: UseFormSetValue<any>;
  otherStyles?: string;
}

declare interface BankTabItemProps {
  account: Account;
  appwriteItemId?: string;
}

declare interface TotlaBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}

declare interface FooterProps {
  user: User;
  type: 'desktop' | 'mobile';
}

declare interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}

declare interface SiderbarProps {
  user: User;
}

declare interface RecentTransactionsProps {
  accounts: Account[];
  transactions: Transaction[];
  appwriteItemId: string;
  page: number;
}

declare interface TransactionHistoryTableProps {
  transactions: Transaction[];
  page: number;
}

declare interface CategoryBadgeProps {
  category: string;
}

declare interface TransactionTableProps {
  transactions: Transaction[];
}

declare interface CategoryProps {
  category: CategoryCount;
}

declare interface DoughnutChartProps {
  accounts: Account[];
}

declare interface PaymentTransferFormProps {
  accounts: Account[];
}

// Actions
declare interface GetAccountsProps {
  userId: string;
}

declare interface GetAccountProps {
  appwriteItemId: string;
}

declare interface GetInstitutionProps {
  institutionId: string;
}

declare interface GetTransactionsProps {
  accessToken: string;
}

declare interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}

declare interface CreateTransactionProps {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}

declare interface GetTransactionsByBankIdProps {
  bankId: string;
}

declare interface SignInProps {
  email: string;
  password: string;
}

declare interface GetDataBaseUserProps {
  userId: string;
}

declare interface ExchangePublicTokenProps {
  publicToken: string;
  user: User;
}

declare interface GetBanksProps {
  userId: string;
}

declare interface GetBankProps {
  documentId: string;
}

declare interface GetBankByAccountIdProps {
  accountId: string;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_APPWRITE_ENDPOINT: string;
    NEXT_PUBLIC_APPWRITE_PROJECT: string;
    APPWRITE_DATABASE_ID: string;
    APPWRITE_USER_COLLECTION_ID: string;
    APPWRITE_ITEM_COLLECTION_ID: string;
    APPWRITE_BANK_COLLECTION_ID: string;
    APPWRITE_TRANSACTION_COLLECTION_ID: string;
    NEXT_APPWRITE_KEY: string;
    PLAID_CLIENT_ID: string;
    PLAID_SECRET: string;
    PLAID_ENV: string;
    PLAID_PRODUCTS: string;
    PLAID_COUNTRY_CODES: string;
    DWOLLA_KEY: string;
    DWOLLA_SECRET: string;
    DWOLLA_BASE_URL: string;
    DWOLLA_ENV: string;
  }
}
