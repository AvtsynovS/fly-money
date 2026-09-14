'use client';

import { TransferTransaction } from '../../types/types';
import { Loader, Typography, Workspace } from '@/components/shared';
import { useTransferStore } from '../../store/transfers.store';
import { DataTable } from './DataTable';
import { getColumns } from './columns';
import { useParams } from 'next/navigation';

const mockTransactions: TransferTransaction[] = [
  {
    id: '1',
    date: '15.06.2025',
    amount: 1200,
    currency: 'RUB',
    country: 'Азербайджан',
    recipient: 'Аскеров Асиф',
    status: 'success',
  },
  {
    id: '2',
    date: '14.03.2025',
    amount: 3000,
    currency: 'RUB',
    country: 'Армения',
    recipient: 'Барсегян Армен',
    status: 'failed',
  },
  {
    id: '3',
    date: '02.01.2025',
    amount: 5000,
    currency: 'RUB',
    country: 'Узбекистан',
    recipient: 'Каримов Шерзод',
    status: 'success',
  },
];

export const TransfersHistory = () => {
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'ru';

  const { transfers, isLoading, fetchTransfers } = useTransferStore();

  const columns = getColumns(lang);

  return (
    <Workspace>
      <Typography variant="h2" as="h2">
        История переводов
      </Typography>

      <div className="min-h-50 rounded-xl border border-border shadow-sm">
        {isLoading ? (
          <div className="flex justify-center pt-6">
            <Loader />
          </div>
        ) : (
          <DataTable columns={columns} data={mockTransactions} />
        )}
      </div>
    </Workspace>
  );
};
