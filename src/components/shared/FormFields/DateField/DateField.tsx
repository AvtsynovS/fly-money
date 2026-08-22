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

interface DateFieldProps<
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

export const DateField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  required,
  description,
  className,
  placeholder = 'ДД.ММ.ГГГГ',
  autoFocus,
  ...rest
}: DateFieldProps<TFieldValues, TName>) => {
  const { control, formState } = useFormContext<TFieldValues>();
  const errorMessage = formState.errors?.[name]?.message?.toString();

  return (
    <div className="flex grow flex-col">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref, ...fieldProps } }) => {
          const handleAccept = (maskedValue: string) => {
            if (maskedValue === '__.__.____') {
              onChange('');
            } else {
              onChange(maskedValue);
            }
          };

          const handleCalendarSelect = (date: Date | undefined) => {
            if (date && !isNaN(date.getTime())) {
              const formattedDate = format(date, 'dd.MM.yyyy');
              onChange(formattedDate);
            } else {
              onChange('');
            }
          };

          const getCalendarDate = (): Date | undefined => {
            if (!value || value.includes('_') || value.length !== 10) {
              return undefined;
            }

            const parsed = parse(value, 'dd.MM.yyyy', new Date());
            return isValid(parsed) ? parsed : undefined;
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
                  mask="00.00.0000"
                  lazy={false}
                  placeholderChar="_"
                  value={value}
                  onAccept={handleAccept}

                  {...rest}
                  {...fieldProps}
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
                        mode="single"
                        selected={getCalendarDate()}
                        onSelect={handleCalendarSelect}
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
