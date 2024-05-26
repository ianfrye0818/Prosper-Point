import React from 'react';
import HeaderBox from '../_components/_common/HeaderBox';
import TransferForm from './_components/_TransferForm/TransferForm';
import { getUserAccountData } from '@/lib/utils';

export default async function PaymentTranser() {
  const { accounts } = await getUserAccountData();

  if (!accounts) return null;

  return (
    <section className='payment-transfer'>
      <HeaderBox
        title='Payment Transfer'
        subtext='Please provide any specific details or notes related to the transfer'
      />
      <section className='size-full pt-5'>
        <TransferForm accounts={accounts.data} />
      </section>
    </section>
  );
}
