'use client';

import { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
  Controller,
  useFormContext,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

import { Field, FieldDescription, FieldError, FieldLabel } from '../../Fields';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
  ComponentPropsWithoutRef<typeof Checkbox>,
  'name' | 'checked' | 'onCheckedChange'
> {
  name: TName;
  label?: string | ReactNode;
  required?: boolean;
  description?: string | ReactNode;
}

export const CheckboxField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  required,
  description,
  className,
  ...rest
}: CheckboxFieldProps<TFieldValues, TName>) => {
  const { control, formState } = useFormContext<TFieldValues>();
  const errorMessage = formState.errors?.[name]?.message?.toString();

  return (
    <div className="flex grow flex-col">
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, ref } }) => (
          <Field className="relative flex flex-row items-start gap-3 pb-5">
            <Checkbox
              id={name}
              checked={Boolean(value)}
              onCheckedChange={onChange}
              ref={ref}
              className={cn(
                'mt-1 rounded-xs',
                errorMessage &&
                  'border-destructive focus-visible:ring-destructive',
                className,
              )}
              {...rest}
            />
            <FieldLabel
              htmlFor={name}
              className="-ml-1 flex cursor-pointer flex-col gap-1 font-normal select-none"
            >
              {label && (
                <span className="text-sm font-medium text-foreground">
                  {label}
                  {required && <span className="ml-1 text-destructive">*</span>}
                </span>
              )}
              {description && (
                <FieldDescription className="mb-0.5 text-xs text-muted-foreground">
                  {description}
                </FieldDescription>
              )}
            </FieldLabel>
            <FieldError className="absolute inset-x-0 bottom-0">
              {errorMessage}
            </FieldError>
          </Field>
        )}
      />
    </div>
  );
};
