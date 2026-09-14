import { create } from 'zustand';
import { FiltersData } from '../schemas/transfers.schema';
import { TransferTransaction } from '../types/types';

interface TransferStore {
  filters: FiltersData;
  transfers: TransferTransaction[];
  isLoading: boolean;
  setFilters: (filters: FiltersData) => void;
  fetchTransfers: () => Promise<void>;
}

export const useTransferStore = create<TransferStore>((set, get) => ({
  filters: {},
  transfers: [],
  isLoading: false,
  setFilters: (newFilters) => {
    set({ filters: newFilters });
    // Автоматически запрашиваем данные при изменении фильтров
    get().fetchTransfers();
  },
  fetchTransfers: async () => {
    set({ isLoading: true });
    const currentFilters = get().filters;

    try {
      console.log('Запрос к бэкенду с фильтрами:', currentFilters);
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
