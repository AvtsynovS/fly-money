'use client';

import * as React from 'react';
import { Controller, useFormContext, FieldValues, Path } from 'react-hook-form';
import { IMaskMixin } from 'react-imask';

import { Field, FieldDescription, FieldError, FieldLabel } from '../../Fields';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface InnerInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  inputRef: React.Ref<HTMLInputElement>;
}

const MaskedInput = IMaskMixin(({ inputRef, ...props }: InnerInputProps) => (
  <Input ref={inputRef} {...props} />
));

interface TextFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  name: TName;
  label?: string;
  required?: boolean;
  description?: string;
  mask?: string | RegExp;
  lazy?: boolean;
  prepareChar?: (str: string, masked: any) => string;
}

export const TextField = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  name,
  label,
  required,
  description,
  className,
  mask,
  lazy = true,
  prepareChar,
  ...rest
}: TextFieldProps<TFieldValues, TName>) => {
  const { control, formState } = useFormContext<TFieldValues>();
  const errorMessage = formState.errors?.[name]?.message?.toString();

  return (
    <div className="flex grow flex-col">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref, ...fieldProps } }) => {
          const stringValue = value ? String(value) : '';

          const handleAccept = (maskedValue: string) => {
            onChange(maskedValue);
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

              {mask ? (
                <MaskedInput
                  mask={mask}
                  lazy={lazy}
                  placeholderChar="_"
                  value={stringValue}
                  onAccept={handleAccept}
                  prepareChar={prepareChar}
                  {...rest}
                  {...fieldProps}
                  id={name}
                  className={cn(
                    errorMessage
                      ? 'border-destructive focus-visible:ring-destructive'
                      : '',
                    className,
                  )}
                />
              ) : (
                <Input
                  {...rest}
                  {...fieldProps}
                  ref={ref}
                  id={name}
                  value={stringValue}
                  onChange={(e) => onChange(e.target.value)}
                  className={cn(
                    errorMessage
                      ? 'border-destructive focus-visible:ring-destructive'
                      : '',
                    className,
                  )}
                />
              )}

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
