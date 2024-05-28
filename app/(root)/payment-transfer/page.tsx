'use client';
import React from 'react';
import HeaderBox from '../_components/_common/HeaderBox';
import TransferForm from './_components/_TransferForm/TransferForm';
import { useUserAccountData } from '@/app/Providers/AccoundDataProvider';

export default function PaymentTranser() {
  const { userAccountData } = useUserAccountData();
  const { accounts } = userAccountData!;
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
