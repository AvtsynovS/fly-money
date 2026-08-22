'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { addressStepSchema, AddressStepInput } from '../schemas/auth.schema';
import { useAuthRegistrationStore } from '../store/auth.store';
import { FooterForm } from './FooterForm';
import { TextField, Typography } from '@/components/shared';

export const AddressStep = () => {
  const { updateData, nextStep, prevStep, isLoading } =
    useAuthRegistrationStore();

  const methods = useForm<AddressStepInput>({
    resolver: zodResolver(addressStepSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: AddressStepInput) => {
    updateData(values);

    nextStep();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
        <Typography variant="h5" as="h5">
          Адрес проживания
        </Typography>
        <Typography
          variant="description"
          as="p"
          className="text-muted-foreground"
        >
          Укажите фактический адрес проживания
        </Typography>

        <div className="grid grid-cols-2 gap-4">
          <TextField
            name="addressCountry"
            type="text"
            label="Страна"
            placeholder="Страна"
            autoFocus
            disabled={isLoading}
            required
          />
          <TextField
            name="addressCity"
            type="text"
            label="Город"
            placeholder="Город"
            disabled={isLoading}
            required
          />
          <TextField
            name="addressStreet"
            type="text"
            label="Улица"
            placeholder="Улица"
            disabled={isLoading}
            required
          />
          <TextField
            name="addressHouse"
            type="text"
            label="Дом, квартира"
            placeholder="Дом, квартира"
            disabled={isLoading}
            required
          />
        </div>
        <FooterForm
          cancelText="Назад"
          confirmText="Продолжить"
          isLoading={isLoading}
          onCancel={prevStep}
        />
      </form>
    </FormProvider>
  );
};
