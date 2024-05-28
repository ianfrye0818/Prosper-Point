'use server';
import { getBank } from '@/app/(root)/_actions/bank.actions';
import { PAYMENT_TRANSFER_FORM_SCHEMA } from '@/zod-schemas/index.';
import * as z from 'zod';
import { createTransfer } from './dwolla.actions';
import { createTransaction } from '@/app/(root)/_actions/transactions.actions';

export async function createTransferTransaction(
  data: z.infer<typeof PAYMENT_TRANSFER_FORM_SCHEMA>
) {
  try {
    const receiverBank = await getBank({ documentId: data.receiverBank });
    const senderBank = await getBank({ documentId: data.senderBank });
    if (!receiverBank || !senderBank) throw new Error('Invalid sender or receiver bank');

    const transferParams: TransferParams = {
      sourceFundingSourceUrl: senderBank.fundingSourceUrl,
      destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
      amount: data.amount,
    };

    const transfer = await createTransfer(transferParams);

    if (!transfer) throw new Error('Error transferring funds');

    const transaction: CreateTransactionProps = {
      name: data.name,
      amount: data.amount,
      senderBankId: senderBank.$id,
      senderId: senderBank.userId.$id,
      receiverBankId: receiverBank.$id,
      receiverId: receiverBank.userId.$id,
    };

    return await createTransaction(transaction);
  } catch (error) {
    console.error(['transferFunds'], 'Error transferring funds');
    throw error;
  }
}
