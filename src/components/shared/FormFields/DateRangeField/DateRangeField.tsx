'use client';

import * as React from 'react';
import {
  Controller,
  useFormContext,
  FieldValues,
  FieldPath,
} from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { format, parse, isValid } from 'date-fns';
import { IMaskMixin } from 'react-imask';
import { DateRange } from 'react-day-picker';

import { Field, FieldDescription, FieldError, FieldLabel } from '../../Fields';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface InnerInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  inputRef: React.Ref<HTMLInputElement>;
}

const MaskedInput = IMaskMixin(({ inputRef, ...props }: InnerInputProps) => (
  <Input ref={inputRef} {...props} />
));

export interface DateRangeValue {
  from: string;
  to: string;
}

interface DateRangeFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  name: TName;
  label?: string;
  required?: boolean;
  description?: string;
}

const DEFAULT_RANGE_VALUE = { from: '', to: '' };

export const DateRangeField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  required,
  description,
  className,
  placeholder = 'дд.мм.гггг - дд.мм.гггг',
  autoFocus,
  ...rest
}: DateRangeFieldProps<TFieldValues, TName>) => {
  const { control, formState } = useFormContext<TFieldValues>();
  const errorMessage = formState.errors?.[name]?.message?.toString();

  return (
    <div className="flex grow flex-col">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const currentValue: DateRangeValue = value || DEFAULT_RANGE_VALUE;

          const getInputValue = () => {
            if (!currentValue.from && !currentValue.to) return '';
            if (currentValue.from && !currentValue.to)
              return `${currentValue.from} - `;
            return `${currentValue.from} - ${currentValue.to}`;
          };

          const handleAccept = (maskedValue: string) => {
            if (maskedValue === '__.__.____ - __.__.____') {
              onChange(DEFAULT_RANGE_VALUE);
              return;
            }

            const parts = maskedValue.split(' - ');
            const fromPart = parts[0]?.replaceAll('_', '') || '';
            const toPart = parts[1]?.replaceAll('_', '') || '';

            onChange({
              from: fromPart.length === 10 ? fromPart : '',
              to: toPart.length === 10 ? toPart : '',
            });
          };

          const handleCalendarSelect = (selectedDay: Date) => {
            const fromDate = currentValue.from
              ? parse(currentValue.from, 'dd.MM.yyyy', new Date())
              : null;
            const toDate = currentValue.to
              ? parse(currentValue.to, 'dd.MM.yyyy', new Date())
              : null;

            if ((fromDate && toDate) || (!fromDate && !toDate)) {
              const fromStr = format(selectedDay, 'dd.MM.yyyy');
              onChange({ from: fromStr, to: '' });
              return;
            }

            if (fromDate && !toDate) {
              if (selectedDay < fromDate) {
                const fromStr = format(selectedDay, 'dd.MM.yyyy');
                const toStr = format(fromDate, 'dd.MM.yyyy');
                onChange({ from: fromStr, to: toStr });
              } else {
                const toStr = format(selectedDay, 'dd.MM.yyyy');
                onChange({ from: currentValue.from, to: toStr });
              }
              return;
            }
          };

          const getCalendarDateRange = (): DateRange | undefined => {
            if (!currentValue.from) return undefined;

            const fromDate = parse(currentValue.from, 'dd.MM.yyyy', new Date());
            const toDate = currentValue.to
              ? parse(currentValue.to, 'dd.MM.yyyy', new Date())
              : undefined;

            return {
              from: isValid(fromDate) ? fromDate : undefined,
              to: toDate && isValid(toDate) ? toDate : undefined,
            };
          };

          return (
            <Field className="relative pb-5">
              {label && (
                <FieldLabel htmlFor={name}>
                  {label}
                  {required && <span className="ml-1 text-destructive">*</span>}
                </FieldLabel>
              )}
              {description && (
                <FieldDescription className="mb-0.5 ml-3">
                  {description}
                </FieldDescription>
              )}

              <div className="relative flex items-center">
                <MaskedInput
                  mask="00.00.0000 - 00.00.0000"
                  lazy={true}
                  placeholderChar="_"
                  value={getInputValue()}
                  onAccept={handleAccept}
                  {...rest}
                  id={name}
                  placeholder={placeholder}
                  className={cn(
                    'pr-10 text-base',
                    errorMessage
                      ? 'border-destructive focus-visible:ring-destructive'
                      : '',
                    className,
                  )}
                />

                <div className="absolute top-0 right-0 bottom-0 flex items-center">
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="p-0 hover:bg-transparent"
                        />
                      }
                    >
                      <CalendarIcon className="text-muted-foreground transition-colors hover:text-foreground" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="range"
                        selected={getCalendarDateRange()}
                        onSelect={(_, selectedDay) =>
                          handleCalendarSelect(selectedDay)
                        }
                        numberOfMonths={2}
                        autoFocus={autoFocus}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <FieldError className="absolute inset-x-0 bottom-0">
                {errorMessage}
              </FieldError>
            </Field>
          );
        }}
      />
    </div>
  );
};
