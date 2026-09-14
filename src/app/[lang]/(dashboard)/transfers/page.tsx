import { Workspace } from '@/components/shared';
import { TransfersFilter, TransfersHistory } from '@/domains/user';

export default function TransfersHistoryPage() {
  return (
    <Workspace>
      <TransfersFilter />
      <TransfersHistory />
    </Workspace>
  );
}
