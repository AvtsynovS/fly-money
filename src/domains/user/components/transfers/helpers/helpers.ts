import { TransferStatus } from '../types/types';

export const getStatusVariant = (status: TransferStatus) => {
  switch (status) {
    case 'failed':
      return 'destructive';
    case 'pending':
      return 'secondary';
    case 'success':
    default:
      return 'default';
  }
};

export const getStatusLabel = (status: TransferStatus) => {
  switch (status) {
    case 'failed':
      return 'Отказ';
    case 'pending':
      return 'Отправляется';
    case 'success':
    default:
      return 'Успешно';
  }
};
