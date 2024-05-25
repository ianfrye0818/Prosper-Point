import React from 'react';
import HeaderBox from '../_components/_common/HeaderBox';
import TransferForm from './_components/_TransferForm/TransferForm';

export default function PaymentTranser() {
  return (
    <section className='payment-transfer'>
      <HeaderBox
        title='Payment Transfer'
        subtext='Please provide any specific details or notes related to the transfer'
      />
      <section className='size-full pt-5'>
        <TransferForm />
      </section>
    </section>
  );
}
