import { TableCell, TableRow } from '@/components/ui/table';
import { formatTransactionObject } from '@/lib/utils';
import CategoryBadge from './CategoryBadge';

export default function TransactionTableRow({ transaction }: { transaction: Transaction }) {
  const { name, amount, status, date, paymentChannel, category } =
    formatTransactionObject(transaction);
  const isNegative = amount[0] === '-';

  return (
    <TableRow
      className={`${isNegative ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} !over:bg-none !border-b-DEFAULT`}
    >
      <TableCell className='max-w-[250px] pl-2 pr-10'>
        <div className='flex items-center gap-3'>
          <h1 className='text-14 truncate font-semibold text-[#344054]'>{name}</h1>
        </div>
      </TableCell>
      <TableCell
        className={`pl-2 pr-10 font-semibold ${isNegative ? 'text-[#F04438]' : 'text-[#039855]'}`}
      >
        {amount}
      </TableCell>
      <TableCell className='pl-2 pr-10'>
        <CategoryBadge category={status} />
      </TableCell>
      <TableCell className='pl-2 pr-10 min-w-32'>{date.dateTime}</TableCell>
      <TableCell className='pl-2 pr-10 capitalize min-w-24'>{paymentChannel}</TableCell>
      <TableCell className='pl-2 pr-10 max-md:hidden'>
        <CategoryBadge category={category} />
      </TableCell>
    </TableRow>
  );
}
