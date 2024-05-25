import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import TransactionTableRow from './TransactionTableRow';

export default function TransactionsTable({ transactions }: TransactionTableProps) {
  return (
    <Table>
      <TableHeader className='bg-{#f9fafb]'>
        <TableRow>
          <TableHead className='px-2'>Name</TableHead>
          <TableHead className='px-2'>Amount</TableHead>
          <TableHead className='px-2'>Status</TableHead>
          <TableHead className='px-2'>Date</TableHead>
          <TableHead className='px-2 max-md:hidden'>Channel</TableHead>
          <TableHead className='px-2 max-md:hidden'>Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TransactionTableRow
            key={transaction.$id}
            transaction={transaction}
          />
        ))}
      </TableBody>
    </Table>
  );
}
