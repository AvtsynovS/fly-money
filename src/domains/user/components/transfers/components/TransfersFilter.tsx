'use client';

import { SelectField } from '@/components/shared';
import { DateRangeField } from '@/components/shared/FormFields/DateRangeField/DateRangeField';
import { Button } from '@ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { FiltersData, filtersSchema } from '../schemas/transfers.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransferStore } from '../store/transfers.store';

// TODO Вынести в моки
const currencies = [
  {
    label: 'Российский рубль (RUB)',
    value: 'RUB',
  },
  {
    label: 'Доллар США (USD)',
    value: 'USD',
  },
  {
    label: 'Евро (EUR)',
    value: 'EUR',
  },
];

const countries = [
  {
    label: 'Азербайджан',
    value: 'az',
  },
  {
    label: 'Россия',
    value: 'rus',
  },
  {
    label: 'Узбекистан',
    value: 'uz',
  },
];

export const TransfersFilter = () => {
  const setFilters = useTransferStore((state) => state.setFilters);

  const methods = useForm<FiltersData>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      currency: '',
      country: '',
      period: { from: '', to: '' },
    },
  });

  const onSubmit = (data: FiltersData) => {
    setFilters(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="grid w-full grid-cols-1 items-center gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            <SelectField
              name="currency"
              label="Валюта перевода"
              options={currencies}
              // disabled={isLoading}
            />
            <SelectField
              name="country"
              label="Страна"
              options={countries}
              // disabled={isLoading}
            />
            <DateRangeField
              name="period"
              label="Период"
              // disabled={isLoading}
            />
            <Button>Применить</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
