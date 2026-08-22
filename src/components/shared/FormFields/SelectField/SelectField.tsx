'use client';

import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
  Controller,
  useFormContext,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

import { Field, FieldDescription, FieldError, FieldLabel } from '../../Fields';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';

export interface SelectOption {
  value: string;
  label: string;
}

type ShadcnSelectProps = ComponentPropsWithoutRef<typeof Select>;

interface SelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ShadcnSelectProps {
  name: TName;
  label?: ReactNode;
  options: SelectOption[];
  required?: boolean;
  description?: string;
  placeholder?: string;
  className?: string;
}

export const SelectField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  required = false,
  options,
  description,
  placeholder = 'Выберите значение',
  className,
  ...rest
}: SelectFieldProps<TFieldValues, TName>) => {
  const { control, formState } = useFormContext<TFieldValues>();
  const errorMessage = formState.errors?.[name]?.message?.toString();

  return (
    <div className="flex w-full flex-col">
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          const stringValue = value ? String(value) : '';
          const selectedOption = options.find(
            (opt) => opt.value === stringValue,
          );

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

              <Select value={stringValue} onValueChange={onChange} {...rest}>
                <SelectTrigger
                  id={name}
                  className={cn(
                    'w-full',
                    errorMessage
                      ? 'border-destructive focus-visible:ring-destructive'
                      : '',
                    className,
                  )}
                >
                  <SelectValue placeholder={placeholder}>
                    {selectedOption ? selectedOption.label : undefined}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
