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

export default function TransferForm({ accounts }: PaymentTransferFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = PAYMENT_TRANSFER_FORM_SCHEMA;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      amount: '',
      sharableId: '',
      senderBank: '',
    },
  });

  async function submit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await createTransferTransaction(data);

      form.reset();
      router.push('/');
    } catch (error) {
      // TODO: handle error for user
      console.error(error);
    }
    setIsLoading(false);
  }

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
          label='Select Source Bank'
        />

        <ZodTransferFormField
          type={InputType.TEXTAREA}
          control={form.control}
          name='name'
          description='Please provide any additional information or instructions for the recipient.'
          label='Transfer Note (Optional)'
          placeholder='Add a note...'
        />

        <div className='payment-transfer_form-details'>
          <h2 className='text-18 font-semibold text-gray-900'>Bank account details</h2>
          <p className='text-16 font-normal text-gray-600'>
            Enter the bank account details of the recipient
          </p>
        </div>

        <ZodTransferFormField
          control={form.control}
          name='email'
          label={"Recipient's Email"}
          placeholder='example@example.com'
        />

        <ZodTransferFormField
          control={form.control}
          name='sharableId'
          label={"Receiver's Sharable ID"}
          placeholder='Enter the public account number'
        />

        <ZodTransferFormField
          control={form.control}
          name='amount'
          label='Amount'
          placeholder='ex: 5.00'
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
