import { TableCell, TableRow } from '@/components/ui/table';
import { formatTransactionObject } from '@/lib/utils';

export default function TransactionTableRow({ transaction }: { transaction: Transaction }) {
  const { name, amount, status, date, paymentChannel, category } =
    formatTransactionObject(transaction);

  return (
    <TableRow key={transaction.$id}>
      <TableCell>{name}</TableCell>
      <TableCell className='text-right'>{amount}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{date.dateTime}</TableCell>
      <TableCell>{paymentChannel}</TableCell>
      <TableCell>{category}</TableCell>
    </TableRow>
  );
}
