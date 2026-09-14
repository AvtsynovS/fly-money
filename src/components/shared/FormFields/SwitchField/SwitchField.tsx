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
import { Switch } from '@/components/ui/switch';

type ShadcnSwitchProps = ComponentPropsWithoutRef<typeof Switch>;

interface SwitchFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ShadcnSwitchProps, 'checked' | 'onCheckedChange'> {
  name: TName;
  label?: ReactNode;
  required?: boolean;
  description?: string;
  className?: string;
  labelPosition?: 'top' | 'right';
}

export const SwitchField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  required = false,
  description,
  className,
  labelPosition = 'top',
  ...rest
}: SwitchFieldProps<TFieldValues, TName>) => {
  const { control, formState } = useFormContext<TFieldValues>();

  const error = name
    .split('.')
    .reduce((obj, key) => obj?.[key], formState.errors as any);
  const errorMessage = error?.message?.toString();

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          const isChecked = Boolean(value);

          return (
            <Field className="relative pb-5">
              {label && labelPosition === 'top' && (
                <>
                  <FieldLabel htmlFor={name}>
                    {label}
                    {required && (
                      <span className="ml-1 text-destructive">*</span>
                    )}
                  </FieldLabel>
                  {description && (
                    <FieldDescription className="mb-2 ml-3">
                      {description}
                    </FieldDescription>
                  )}
                </>
              )}

              <div
                className={cn(
                  'flex items-center',
                  labelPosition === 'right'
                    ? 'flex-row gap-3 pt-1'
                    : 'flex-row',
                )}
              >
                <Switch
                  id={name}
                  checked={isChecked}
                  onCheckedChange={onChange}
                  className={cn(
                    errorMessage
                      ? 'border-destructive focus-visible:ring-destructive'
                      : '',
                    className,
                  )}
                  {...rest}
                />

                {label && labelPosition === 'right' && (
                  <div className="flex cursor-pointer flex-col space-y-0.5 select-none">
                    <FieldLabel htmlFor={name} className="mb-0 cursor-pointer">
                      {label}
                      {required && (
                        <span className="ml-1 text-destructive">*</span>
                      )}
                    </FieldLabel>
                    {description && (
                      <FieldDescription className="mb-0 ml-0">
                        {description}
                      </FieldDescription>
                    )}
                  </div>
                )}
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
