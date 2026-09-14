'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { ru, enUS } from 'date-fns/locale';
import { TransferTransaction } from '../../types/types';
import { format, Locale, parse } from 'date-fns';
import type { DataTableFeatures } from './data-table-features';
import { Badge } from '@/components/ui/badge';
import { getStatusLabel, getStatusVariant } from '../../helpers/helpers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const columnHelper = createColumnHelper<
  DataTableFeatures,
  TransferTransaction
>();

const localesMap: Record<string, Locale> = {
  ru: ru,
  en: enUS,
};

export const getColumns = (locale: string) => {
  const currentLocale = localesMap[locale] || 'ru';

  return columnHelper.columns([
    columnHelper.accessor('date', {
      header: 'Дата отправления',
      cell: (info) => {
        const rawDateString = info.getValue();
        const parsedDate = parse(rawDateString, 'dd.MM.yyyy', new Date());
        const formattedDate = format(parsedDate, 'P', {
          locale: currentLocale,
        });

        return <span>{formattedDate}</span>;
      },
    }),
    columnHelper.accessor('country', {
      header: 'Страна',
    }),
    columnHelper.accessor('recipient', {
      header: 'Получатель',
    }),
    columnHelper.accessor('status', {
      header: () => <div className="text-center">Статус</div>,
      cell: (info) => {
        const status = info.getValue();
        const variant = getStatusVariant(status);
        const label = getStatusLabel(status);

        return (
          <div className="text-center">
            <Badge variant={variant}>{label}</Badge>
          </div>
        );
      },
    }),
    columnHelper.accessor('amount', {
      header: () => <div className="text-right">Сумма</div>,
      cell: (info) => {
        const amount = info.getValue();
        const currency = info.row.original.currency;

        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency,
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    }),
    columnHelper.display({
      id: 'actions',
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="h-8 w-8 p-0" />}
          >
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Действия</DropdownMenuLabel>
              <DropdownMenuItem>Инфо</DropdownMenuItem>
              <DropdownMenuItem>Повторить</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ]);
};
