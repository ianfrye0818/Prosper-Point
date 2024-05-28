'use client';

import { Form } from '@/components/ui/form';
import { PAYMENT_TRANSFER_FORM_SCHEMA } from '@/zod-schemas/index.';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import ZodTransferFormField from './ZodTransferFormField';
import { Button } from '@/components/ui/button';
import { InputType } from '@/types/enums';
import { Loader2 } from 'lucide-react';
import { createTransferTransaction } from '@/app/(auth)/_authActions/transfer.actions';
import { set } from 'date-fns';

export default function TransferForm({ accounts }: PaymentTransferFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = PAYMENT_TRANSFER_FORM_SCHEMA;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memo: '',
      name: 'Online Transfer',
      amount: '',
      senderBank: accounts[0].appwriteItemId,
      receiverBank: accounts.length > 1 ? accounts[1].appwriteItemId : accounts[0].appwriteItemId,
    },
  });

  async function submit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (data.senderBank === data.receiverBank) {
      form.setError('receiverBank', {
        type: 'value',
        message: 'Sender and Receiver bank cannot be the same',
      });
      setIsLoading(false);
      return;
    }
    try {
      const transfer = await createTransferTransaction(data);
      console.log(transfer);
      router.push('/');
      form.reset();
    } catch (error) {
      // TODO: handle error for user
      console.error(error);
      setIsLoading(false);
      //throw toast error here if needed
    }
  }

  console.log(form.getValues());
  console.log(isLoading);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className='flex flex-col'
      >
        <div className='payment-transfer_form-details'>
          <h2 className='text-18 font-semibold text-gray-900'>Transfer Details</h2>
          <p className='text-16 font-normal text-gray-600'>Enter Details of the Recipeient</p>
        </div>
        <ZodTransferFormField
          type={InputType.SELECT}
          accounts={accounts}
          setValue={form.setValue}
          otherStyles='w-full'
          control={form.control}
          name='senderBank'
          label='Select Source Account'
          accountIndex={0}
        />
        <ZodTransferFormField
          type={InputType.SELECT}
          accounts={accounts}
          setValue={form.setValue}
          otherStyles='w-full'
          control={form.control}
          name='receiverBank'
          label='Select Destination Account'
          accountIndex={accounts.length > 1 ? 1 : 0}
        />

        <ZodTransferFormField
          type={InputType.INPUT}
          control={form.control}
          name='name'
          label='Transfer Name'
        />

        <ZodTransferFormField
          type={InputType.TEXTAREA}
          control={form.control}
          name='memo'
          label={'Memo (Optional)'}
          placeholder='Write a note here...'
        />

        <ZodTransferFormField
          control={form.control}
          name='amount'
          label='Amount'
          placeholder='Valid amount between $1 and $500'
        />

        <div className='payment-transfer_btn-box'>
          <Button
            type='submit'
            className='payment-transfer_btn'
          >
            {isLoading ? (
              <>
                <Loader2 /> Sending....
              </>
            ) : (
              'Transfer Funds'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
