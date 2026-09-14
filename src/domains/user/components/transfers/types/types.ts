import { CurrencyType } from '@/domains/model/types';

export type TransferStatus = 'pending' | 'success' | 'failed';

export interface TransferTransaction {
  id: string;
  date: string;
  amount: number;
  currency: CurrencyType;
  country: string;
  recipient: string;
  status: TransferStatus;
}
