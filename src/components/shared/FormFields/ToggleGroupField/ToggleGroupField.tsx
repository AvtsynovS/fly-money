'use client';

import { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
  Controller,
  useFormContext,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

import { Field, FieldDescription, FieldError, FieldLabel } from '../../Fields';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

type ShadcnToggleGroupProps = ComponentPropsWithoutRef<typeof ToggleGroup>;

export interface ToggleGroupOption {
  value: string;
  label: ReactNode;
}

interface ToggleGroupFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ShadcnToggleGroupProps {
  name: TName;
  label?: ReactNode;
  options: ToggleGroupOption[];
  required?: boolean;
  description?: string;
  placeholder?: string;
  className?: string;
}

export const ToggleGroupField = <
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
  onValueChange,
  ...rest
}: ToggleGroupFieldProps<TFieldValues, TName>) => {
  const {
    control,

    formState: { errors },
  } = useFormContext<TFieldValues>();
  const errorMessage = errors?.[name]?.message?.toString();

  return (
    <div className="flex w-full flex-col">
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
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

              <ToggleGroup
                value={value}
                onValueChange={(val, event) => {
                  if (!rest.multiple && val.length === 0) return;

                  onChange(val);
                  onValueChange?.(val, event);
                }}
                className="flex w-full justify-between gap-1 rounded-xl bg-muted text-center"
                {...rest}
              >
                {options.map((opt) => (
                  <ToggleGroupItem
                    key={opt.value}
                    value={opt.value}
                    className={cn(
                      'flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-transparent px-3 py-2 text-sm font-semibold text-muted-foreground transition-all select-none',
                      'font-bold data-pressed:bg-primary data-pressed:text-white data-pressed:shadow-xs dark:data-pressed:text-black',
                      'hover:text-foreground/80',
                    )}
                  >
                    {opt.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

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
